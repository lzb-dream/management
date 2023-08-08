<template>
	switch parent border: <el-switch v-model="parentBorder" /> switch child
	border: <el-switch v-model="childBorder" />
	<el-button type="primary">添加货物名称</el-button>
	<el-table :data="tableData" :border="parentBorder">

		<el-table-column type="expand">
			<template #default="props">
				<div m="4" class="son">
					<p m="t-0 b-2">添加管理员: {{ props.row.user }}</p>
					<p m="t-0 b-2">添加时间: {{ props.row.addTime }}</p>
					<!-- 					<p m="t-0 b-2">Address: {{ props.row.address }}</p>
							<p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
							<h3>Family</h3> -->
					<el-button type="primary">添加货物</el-button>
					<el-table :data="props.row.logs" :border="childBorder">
						<el-table-column label="ID" prop="ID" />
						<el-table-column label="添加时间" prop="date" />
						<el-table-column label="状态" prop="static" />
						<el-table-column label="备注" prop="Instructions" />
						<el-table-column label="菜单" prop="menu">
							<template #default>
								<el-button link type="primary" size="small" @click="handleClick">日志</el-button>
								<el-button link type="warning" size="small">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="controls">
						<el-button>导出所有日志信息</el-button>
						<el-button>所有日志</el-button>
					</div>
				</div>
			</template>
		</el-table-column>

		<el-table-column label="货物名称" prop="cargoName" />
		<el-table-column label="添加时间" prop="addTime" />
		<el-table-column label="入库数量" prop="QuantityStorage" />
		<el-table-column label="使用数量" prop="QuantityUsed" />
		<el-table-column label="出库数量" prop="OutboundQuantity" />
		<el-table-column label="损耗数量" prop="LossQuantity" />
		<el-table-column label="仓库库存" prop="AvailableQuantity" />

	</el-table>

</template>

<script setup>
	import {
		ref
	} from 'vue'

	const parentBorder = ref(false)
	const childBorder = ref(false)

	const tableData = [{
		cargoName: 'FTF无人机套装',
		addTime: '2023-6-10 19:23:56',
		QuantityStorage: 12,
		QuantityUsed: 2,
		OutboundQuantity: 3,
		LossQuantity: 2,
		AvailableQuantity: 7,
		user: 'XXX',
		logs: [{
				date: '2023-7-25',
				ID: 1,
				static: '使用',
				Instructions: '使用者XXX',
				menu: ''
			},
			{
				date: '2023-7-25',
				ID: 1,
				static: '使用',
				Instructions: '使用者XXX',
				menu: ''
			},
			{
				date: '2023-7-25',
				ID: 1,
				static: '使用',
				Instructions: '使用者XXX',
				menu: ''
			},
		]
	}, ]
</script>

<style lang="less" scoped>
	.son {
		padding-left: 18px;
		border-radius: 5px;
		background-color: #FFFFE0;
		color: black;
		margin-right: 7px;
		.controls {
			margin-top: 20px;
			background-color: #20B2AA;
			display: flex;
			justify-content: flex-end;
			margin-right: 18px;
			border-radius: 5px;
			padding: 5px 10px;
		}
	}
	
	// 子表字体颜色
	.son::v-deep .cell {
		color: black;
	}

	// 控制总表颜色
	.el-table {
		background-color: transparent;
		// background-color: gray;
		// 控制hover颜色
		--el-table-row-hover-bg-color: gray;
		color: #fff;
	}

	.el-table::v-deep tr {
		background-color: transparent;
	}

	.el-table::v-deep .el-table__expanded-cell {
		background-color: transparent;
	}

	.el-table::v-deep .el-table__expanded-cell:hover {
		background-color: transparent !important;
	}

	.el-table::v-deep th.el-table__cell {
		background-color: transparent;
	}
</style>