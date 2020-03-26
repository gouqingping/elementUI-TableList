<!--
 * @Description: 
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-28 17:21:26
 -->
  <template>
	<div class="tableList">
		<el-table :data="tableData" :border="border" style="width: 100%">
			<!-- 多选框 -->
			<el-table-column :align="align" v-if="isShowSelection" type="selection" width="55"></el-table-column>
			<!-- 序号 -->
			<el-table-column :align="align" v-if="isShowNumber" label="序号" type="index" width="50"></el-table-column>
			<!-- 内容 -->
			<template v-for="(item,index) in condition">
				<el-table-column
					:key="index"
					:prop="item.prop"
					:width="item.width"
					:type="item.type"
					:sortable="item.sortable!='undefined'?item.sortable:false"
					v-if="((item.label!='操作')||(item.type&&item.type!='operation'))&&item.show"
					:align="align"
					:label="item.label"
				>
					<template slot-scope="scope">
						<div v-html="scope.row[item.prop]" :style="item.style" :class="item.class"></div>
					</template>
				</el-table-column>
				<!-- 操作 -->
				<el-table-column
					:key="index"
					:width="item.width"
					:sortable="item.sortable!='undefined'?item.sortable:false"
					v-else-if="item.show"
					:align="align"
					:label="item.label"
				>
					<template slot-scope="scope">
						<template v-for="(opr,index) in item.prop">
							<template v-if="opr.params&&opr.show">
								<el-button
									:key="index"
									:style="item.style"
									:class="item.class"
									v-if="(String(opr.params.value).indexOf(String(scope.row[opr.params.prop]))>-1||String(scope.row[opr.params.prop]).indexOf(String(opr.params.value))>-1)&&!opr.params.show"
									:type="!opr.type?'success':opr.type"
									@click="opr.handleClick(scope.row,index)"
									:size="opr.size!='undefined'?opr.size:'small'"
									:disabled="opr.params.disabled?false:true"
								>{{opr.name}}</el-button>
								<el-button
									:key="index"
									:style="item.style"
									:class="item.class"
									:type="!opr.type?'':opr.type"
									v-else-if="!opr.params.disabled||!opr.params.show"
									@click="opr.handleClick(scope.row,index)"
									:size="opr.size!='undefined'?opr.size:'small'"
									:disabled="!opr.params.disabled?false:true"
								>{{opr.name}}</el-button>
							</template>
							<el-button
								v-else-if="opr.show"
								:key="index"
								:style="item.style"
								:class="item.class"
								@click="opr.handleClick(scope.row,index)"
								:type="!opr.type?'success':opr.type"
								:size="!opr.size?opr.size:'small'"
							>{{opr.name}}</el-button>
						</template>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			style="padding:15px 0"
			background
			v-if="showPage"
			:small="false"
			@size-change="page.handleSizeChange"
			@current-change="page.handleCurrentChange"
			:current-page="page.current"
			:page-sizes="page.sizes"
			:page-size="page.size"
			:layout="page.layout"
			:total="total"
		></el-pagination>
	</div>
</template>

  <script>
import { Button, Pagination, Table } from "element-ui";
export default {
	data() {
		return {
			//总条目数
			total: 100,
			page: {
				// 每页显示条目个数，支持 .sync 修饰符
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
			},
			showPage: true,
			// 是否显示多选框
			isShowSelection: false,
			// 是否显示序号
			isShowNumber: false,
			border: false,
			// 对齐方式
			align: "center",
			tableData: [],
			condition: [
				{
					width: "180",
					prop: "name",
					type: "",
					label: "名称"
				}
			]
		};
	}
};
</script>