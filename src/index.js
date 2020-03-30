import Vue from 'vue';
import tableList from './list.vue';
let TableConstructor = Vue.extend(tableList);
let instance;
let elementNode;
class Submit {
    constructor(func) {
        if (typeof func === 'function') {
            this.submitDataFunc = func;
        }
    }
}

class SetLists {
    constructor(config) {
        this.options = config;
        this.init()
    }
    english(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    }
    toLowerCase(str) {
        return str.toLowerCase()
    }
    isType(obj, type) {
        return Object.prototype.toString.call(obj) === `[object ${this.english(this.toLowerCase(type))}]`
    }
    submit(submitFunc) {
        if (typeof submitFunc == "function") {
            this.submitFrom = submitFunc
        }
        this.options.submit = from => {
            return new Submit(submitFunc).submitDataFunc(from)
        }
    }

    init() {
        let options = this.options
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        if (options && this.isType(options, "Object")) {
            if (!(!options['total'] || this.isType(options['total'], "Number"))) {
                throw `options.total is not Number`
            }

            if (!(
                !options['condition'] || !options['tableData'] ||
                this.isType(options['tableData'], "Array") ||
                this.isType(options['condition'], "Array")
            )) {
                throw `options.tableData || options.condition is not Array`
            }

            if (!(
                !options['page'] ||
                this.isType(options['page'], "Object")
            )) {
                throw `options.page is not Object`
            }

            if (!(!options['align'] || this.isType(options['align'], "string"))) {
                throw `options.align is not String`
            }

            if (!(
                !options['isShowSelection'] || !options['isShowNumber'] ||
                this.isType(options['isShowSelection'], "boolean") ||
                this.isType(options['isShowNumber'], "boolean")
            )) {
                throw `options.isShowSelection || options.isShowNumber is not Boolean`
            }
            if (options.condition) {
                for (let condition of options.condition) {
                    if (condition.show != false) {
                        condition.show = true
                    }
                    if (condition.type && condition.type.toLowerCase() == 'operation') {
                        for (let item of condition.prop) {
                            if (item.show != false) {
                                item.show = true
                            }
                        }
                    }
                    for (let data in options.tableData) {
                        let list = options.tableData[data][condition.prop]
                        for (let con in condition.condition) {
                            let stateCondition = condition.condition[con]
                            if (stateCondition.value == list && condition.type && condition.type.toLowerCase() == 'multiple') {
                                if (stateCondition.style) {
                                    options.tableData[data][condition.prop] = `<span style="${stateCondition.style}">${stateCondition.label}</span>`
                                } else if (stateCondition.class) {
                                    options.tableData[data][condition.prop] = `<div class="${stateCondition.class}">${stateCondition.label}</div>`
                                } else {
                                    options.tableData[data][condition.prop] = stateCondition.label
                                }
                            }
                        }
                    }
                }
            } else {
                throw 'options.condition is not object'
            }
        } else {
            throw 'options is not object'
        }

        //let id = 'Table_' + seed++;
        let id = 'Table_tableList'
        options.submit = from => {
            if (this.submitFrom) return new Submit(this.submitFrom).submitDataFunc(from)
        };

        instance = new TableConstructor({
            data: options
        });

        instance.id = id;


        instance.$mount();

        for (let i = 0; i < elementNode.length; i++) {
            //elementNode.innerHTML =""
            if (elementNode[i].childNodes) {
                for (let node in elementNode[i].childNodes) {
                    instance.$el.id = id
                    if (elementNode[i].childNodes[node].id === "Table_tableList") {
                        elementNode[i].removeChild(elementNode[i].childNodes[node])
                    } else {
                        elementNode[i].appendChild(instance.$el);
                    }
                }
            } else {
                elementNode[i].appendChild(instance.$el);
            }
        }

        return instance;
    }
}

export default class TableList {
    constructor(main) {
        if (main) {
            if (typeof main == "object") {
                elementNode = [main]
            } else {
                if (document.querySelectorAll(main) && typeof main == "string") {
                    elementNode = document.querySelectorAll(main)
                }
            }
        } else {
            elementNode = [document.body]
        }
    }

    initTable(config) {
        return new SetLists(config)
    }
}