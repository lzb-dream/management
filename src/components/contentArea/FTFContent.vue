<template>
	外表边框: <el-switch v-model="parentBorder" />
	内表边框: <el-switch v-model="childBorder" />
	<el-button type="primary" @click="dialogVisible1 = true">添加器材类</el-button>
	<el-table :data="$store.state.equipment.tableData" :border="parentBorder" :expand-change="expandChange(row)">
		<el-table-column type="expand">
			<template #default="props">
				<div m="4" class="son">
					<p m="t-0 b-2">添加管理员: {{ props.row.add_name }}</p>
					<p m="t-0 b-2">添加时间: {{ props.row.add_time }}</p>
					<!-- 					<p m="t-0 b-2">Address: {{ props.row.address }}</p>
							<p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
							<h3>Family</h3> -->
					<el-button type="primary" @click="cargoForm(prpos)">添加货物</el-button>
					<el-table :data="props.row.logs" :border="childBorder">
						<el-table-column label="ID" prop="ID" />
						<el-table-column label="添加时间" prop="date" />
						<el-table-column label="状态" prop="static" />

						<el-table-column label="备注">
							<template #default="{ row }">
								<span>{{row.Instructions}}</span>
							</template>
						</el-table-column>

						<el-table-column label="菜单">
							<template #default>
								<el-button link type="primary" size="small">日志</el-button>
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

		<el-table-column label="器材名称" prop="cargo_name" />
		<el-table-column label="添加时间" prop="add_time" />
		<el-table-column label="入库数量" prop="quantity_in_storage" />
		<el-table-column label="使用数量" prop="quantity_used" />
		<el-table-column label="出库数量" prop="outbound_quantity" />
		<el-table-column label="损耗数量" prop="loss_quantity" />
		<el-table-column label="仓库库存" prop="available_quantity" />

	</el-table>

	<el-dialog v-model="dialogVisible1" title="添加器材类信息表单" width="35%" :close-on-click-modal="false">
		<form action="" method="POST" class="formcontent">
			<div class="input_item">
				<label for="className">货物类名：</label>
				<div class="filed">
					<input type="text" v-model="cargo_name" maxlength="10" id="className" @focus="inputFocus(0)"
						@blur="inputBlur(0)" placeholder="必填">
				</div>
			</div>

			<div class="input_item">
				<label for="merchant">进货对象：</label>
				<div class="filed">
					<input type="text" maxlength="30" v-model="merchant" id="merchant" @focus="inputFocus(2)"
						@blur="inputBlur(2)">
				</div>
			</div>

			<div class="input_item">
				<label for="remark">备注说明：</label>
				<div class="filed" style="padding-left: 0; border: none;">
					<textarea maxlength="200" v-model="remark"></textarea>
				</div>
			</div>
		</form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">Cancel</el-button>
				<el-button type="primary" @click="submitClassName">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>

	<el-dialog v-model="dialogVisible2" title="添加器材" width="35%" :close-on-click-modal="false">
		<form action="" method="POST" class="formcontent">
			<div class="input_item">
				<label for="className"><span>器材</span>&nbsp;&nbsp;&nbsp;<span>ID：</span></label>
				<div class="filed">
					<input type="number" 
					v-model="id" 
					:max="999" 
					id="className" 
					@focus="inputFocus(0)"
					@blur="inputBlur(0)" 
					placeholder="请输入器材ID如:001">
				</div>
			</div>

			<div class="input_item">
				<label for="merchant">器材状态：</label>
				<div>
					<el-select v-model="value" class="m-2" placeholder="请选择器材当前状态" >
						<el-option v-for="item in options" 
						:key="item.value" 
						:label="item.label" 
						:value="item.value"
						:change="changeSelect()"/>
					</el-select>
				</div>
			</div>

			<div class="input_item" v-show="statusRemark">
				<label for="statusRemark">备注说明：</label>
				<div class="filed" style="padding-left: 0; border: none;">
					<textarea maxlength="200" v-model="remark" id="statusRemark" :placeholder="textareaPlaceholder"></textarea>
				</div>
			</div>

		</form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible2 = false">Cancel</el-button>
				<el-button type="primary" @click="addCargo">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>

</template>

<script setup>
import {ref, watch} from 'vue'
import {fetchData,getTime,} from '@/js/components'
import {useStore} from 'vuex'
const mystore = useStore()


// import { ElMessageBox } from 'element-plus'
// const openMessageBox = (title,message)=>{
// 	ElMessageBox.alert(message,title,{
// 		confirmButtonText : 'ok'
// 	})
// }


// 外表边框显示
const parentBorder = ref(false)
// 子表边框显示
const childBorder = ref(false)
// 弹出框
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
// 添加货物类目输入内容绑定
// 类目名
const cargo_name = ref('')
// 添加类目备注
const remark = ref('')
// 进货对象
const merchant = ref('')

// 添加货物备注
const cargo_remark = ref('')
// 添加货物单选框数据
const value = ref('')
const options = [{
		value: 0,
		label: '库存',
		placeholder:''
	},
	{
		value: 1,
		label: '损耗',
		placeholder:'请备注损耗说明'
		
	},
	{
		value: 2,
		label: '出库',
		placeholder:'请备注出库对象及说明'
	},
	{
		value: 3,
		label: '禁用',
		placeholder:'请备注禁用说明'
	},
]

let id = ref('')
// 添加货物状态备注控制
let statusRemark = ref(false)
// 控制备注提示内容
let textareaPlaceholder = ref('') 

// input对焦
const inputFocus = (num) => {
	const input = document.querySelectorAll('.filed')[parseInt(num)]
	input.style.borderColor = 'red'
}
// input失去焦点
const inputBlur = (num) => {
	const input = document.querySelectorAll('.filed')[parseInt(num)]
	input.style.borderColor = 'gray'
	// 对数字输入框进行判断
	// if(num==1){
	// 	if(quantityInStorage.value%1 != 0 || quantityInStorage.value>999){
	// 		quantityInStorage.value = ''
	// 		openMessageBox('输入框提示', '输入内容不能小数且不能大于999')
	// 	}
	// }

}
// 当某一行数据被展开时
const expandChange = (row)=>{
	console.log(row);
}
// 提交货物添加类
const submitClassName = async () => {
	dialogVisible1.value = false
	let path = 'cargo_MaterielManage'
	const body = {
		cargo_name: cargo_name.value.trim(),
		remark: remark.value.trim(),
		merchant: merchant.value.trim(),
		add_time: getTime(),
		add_name: mystore.state.userInfo.username
	}
	const options = {
		method: 'POST',
		body: JSON.stringify(body)
	}
	const data = await fetchData(path, options)

	if (data.status == 200) {
		body['loss_quantity'] = 0
		body['outbound_quantity'] = 0
		body['quantity_in_storage'] = 0
		body['quantity_used'] = 0
		body['available_quantity'] = 0
		body['cargo_info'] = 0
		body['add_name'] = mystore.state.userInfo.username
		mystore.commit('equipment/unshiftTableData', body)
		
	}
}

// 添加货物表单
const cargoForm = (props)=>{
	dialogVisible2.value = true 
	console.log(props)
}

// 添加货物
const addCargo = async () => {
	dialogVisible1.value = false
	let path = 'cargo_MaterielManage'
	const options = {
		method: 'PUT',
		body: JSON.stringify({
			'id': id.value,
			'add_time': getTime(),
			'status': options[value.value].label,
			'cargo_remark': cargo_remark.value,
			'add_user': mystore.state.userInfo.username,
			'cargo_name': ''
		})
	}
	const data = await fetchData(path, options)
	console.log(data);
}


// 货物添加状态改变事件显示备注
const changeSelect = ()=>{value
	statusRemark.value = value.value!=0?true:false
	if(value.value){
		textareaPlaceholder.value = options[value.value].placeholder
	}
}
// 监听货物Id 只能长度为3
watch(id,(newid,oldid)=>{
	if(newid>999){
		id.value = oldid
	}
})

</script>

<style lang="less" scoped>
	input {
		padding: 0;
		border: none;
		outline: none;
		background-color: transparent;
	}

	input::placeholder {
		color: pink;
	}

	// 去除input样式
	input[type=number] {
		-moz-appearance: textfield;
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.son {
		padding-left: 18px;
		border-radius: 5px;
		background-color: #FFB90F;
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

	.formcontent {
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		min-height: 100px;
		background-color: #20B2AA;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.input_item {
			display: flex;
			align-items: center;
			padding-left: 15px;
			margin: 7px 0;

			.filed {
				width: 70%;
				min-width: 50%;
				border: 1px solid white;
				border-radius: 5px;
				border-color: gray;
				padding-left: 5px;

				textarea {
					width: 100%;
					max-width: 100%;
					min-width: 100%;
					min-height: 100px;
					max-height: 200px;
					padding: 5px;
					line-height: 20px;
					border-radius: 5px;
				}

				input {
					width: 100%;
					border-radius: 5px;
					height: 30px;
					font-size: medium;
				}
			}
		}
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