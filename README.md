# 渲染请求列表组件说明

>引入 TableList 方法
```javascript
import TableList from '@/components/tableList/index'
```
>获取列表组件操作
```javascript
new TableList(NODE).initTable({
    total: 30,
    isShowSelection: true,
    isShowNumber: true,
    align: "left",
    page: {
        size: 10,
        sizes: [10, 20, 50, 100],
        current: 1,
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    tableData: [
        {
            readNmae: "",
            date: "2016-05-02",
            name: "王小虎",
            state: 1,
            address: "上海市普陀区金沙江路 1518 弄"
        },
        {
            date: "2016-05-04",
            name: "王小虎",
            state: 0,
            address: "上海市普陀区金沙江路 1517 弄"
        },
        {
            date: "2016-05-01",
            name: "王小虎",
            state: 2,
            address: "上海市普陀区金沙江路 1519 弄"
        },
        {
            date: "2016-05-03",
            name: "王小虎",
            state: 1,
            address: "上海市普陀区金沙江路 1516 弄"
        }
    ],
    condition: [
        {
            width: "180",
            prop: "name",
            label: "名称"
        },
        {
            prop: "date",
            label: "时间",
            sortable: true
        },
        {
            prop: "address",
            label: "地址"
        },
        {
            type: "multiple",
            condition: [
                { label: "未开始", value: 0, style: "color:red" },
                {
                    label: "进行中",
                    value: 1,
                    style: "color:#123455"
                },
                { label: "已完成", value: 2, style: "color:#eee" }
            ],
            prop: "state",
            label: "状态",
            sortable: true
        },
        {
            type: "operation",
            label: "操作",
            prop: [
                {
                    name: "查看",
                    handleClick: val => {
                        console.log(val);
                    },
                    size: "small"
                },
                {
                    name: "编辑",
                    handleClick: val => {
                        console.log(val);
                    },
                    size: "small"
                }
            ]
        }
    ]
});
```

# new TableList().initTable(config) 说明

> **total**

总条数 (Number)

> **isShowSelection**

是否显示多选框 (boolean)

> **isShowNumber**

是否显示序号 (boolean)

> **align**

对齐方式 (String)

> **page**

分页显示配置 (Object)

+ size (Number)
    <p>每页显示条目个数，支持 .sync 修饰符</p>
+ sizes (number[])
    <p>每页显示个数选择器的选项设置</p>
+ layout (String)
    <p>组件布局，子组件名用逗号分隔('prev, pager, next, jumper, ->, total')</p>
+ current (number)
    <p>当前页数，支持 .sync 修饰符</p>
+ handleSizeChange (Function)
    <p>page.size 改变时会触发。(函数回调：每页条数)</p>
+ handleCurrentChange (Function)
    <p>page.current 改变时会触发。(函数回调：当前页)</p>

```js
page: {
    size: 10,
    sizes: [10, 20, 50, 100],
    layout: "total, sizes, prev, pager, next, jumper",
    current: 1,
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
}
```
> **tableData**
<p style="color:red">列表数据展示 (Array)</p>

```js
tableData:[{
    readNmae: "",
    date: "2016-05-02",
    name: "王小虎",
    state: 1,
    address: "上海市普陀区金沙江路 1518 弄"
},
{
    date: "2016-05-04",
    name: "王小虎",
    state: 0,
    address: "上海市普陀区金沙江路 1517 弄"
}]
```

> **condition**
<p style="color:red">列表数据展示条件 (Array)</p>

+ width (Number)
    <p>列宽</p>
+ prop (String)
    <p>列内容的字段名，对应 `tableData` 中的参数</p>
+ label (String)
    <p>列内容显示的标题</p>
+ sortable (Boolean, String)
    <p>对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件</p>
+ type (Null,String)

    处理多条件展示(null,operation,multiple)

    - `null || ""` 穿空或者不传
    - `operation`,操作或者其他处理。设置`type="operation"`时`prop`必须传`Array`类型作为列表渲染参数。如：
        ```js
        condition: [
            {
                type: "operation",
                label: "操作",
                prop: [
                    { name: "查看", handleClick(val){ console.log(val); }, size: "small" },
                    { name: "编辑", handleClick(val){ console.log(val); }, size: "small" },
                ]
            }
        ]
        ```
    - `multiple`, 多条件筛选，需要设置`conditon.condition`,对应 `tableData[condition.prop]` 的值获取 `conditon.condition` 内的 `label、style||class` 渲染页面
        ```js
        condition: [
            {
                type: "multiple",
                condition: [
                    { label: "未开始", value: 0, style: "color:red" },
                    { label: "进行中", value: 1, class: "testClass"},
                    { label: "已完成", value: 2, style: "color:#eee" }
                ],
                prop: "state",
                label: "状态",
                sortable: true
            }
        ]
        ```