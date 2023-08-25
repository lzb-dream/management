<template>
	<div class="loginbox">
		<div class="login" style="color: black;">
			<span>
				<h2 style="letter-spacing: 10px;">登录</h2>
			</span>
			<div class="userInput">
				<span>
					<label for="accountNumber">账号：<input type="text" id="accountNumber" v-model="accountNumber" maxlength="10"></label>
					
				</span>
				<span>
					<label for="password">密码：<input type="text" id="password" v-model="password" maxlength="16"></label>
					
				</span>
			</div>
			<div class="controls">
				<button @click="login">登录</button>
				<button @click="dialogVisible=true">注册</button>
			</div>
		</div>
	</div>

	<el-dialog v-model="dialogVisible" title="注册个人信息" width="30%" class="el-dialog" :close-on-click-modal="false">
		<div class="dialog_body">
			<div class="min_dialog_body">
				<span>
					<el-popover placement="top-start" title="" :width="200" :visible="visible"
						:content="popovercontent">
						<template #reference>
							<label for="name">姓名：<input type="text" id="name" @focus="messageTips('name')" @blur="visible=false" maxlength="10" v-model="username1"></label>
						</template>
					</el-popover>
				</span>
				<span>
					<label for="accountNumber1">账号：<input type="text" id="accountNumber1" @focus="messageTips('number')" @blur="visible=false" maxlength="10" v-model="accountNumber1"></label>
				</span>
				<span>
					<label for="password1">密码：<input type="password" id="password1" @focus="messageTips('password1')" @blur="visible=false" maxlength="16" v-model="password1"></label>
				</span>
				<span>
					<label for="password2">确认密码：<input type="password" id="password2" @focus="messageTips('password2')" @blur="visible=false" maxlength="16" v-model="password2"></label>
				</span>

			</div>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="signin">
					完成注册
				</el-button>
			</span>
		</template>
	</el-dialog>


</template>

<script setup>
import {ref, watch} from 'vue';
import {fetchData} from '@/js/components'
import router from '@/router'

import { useStore } from 'vuex'
const mystore = useStore()

// 弹出信息提示框
import { ElMessageBox } from 'element-plus'
const openMessageBox = (title,message)=>{
	ElMessageBox.alert(message,title,{
		confirmButtonText : 'ok'
	})
}

let accountNumber = ref('123456')
let password = ref('123456')

let dialogVisible = ref(false)
let popovercontent = ref('')
let visible = ref(false)

let username1 = ref('')
let accountNumber1 = ref('')
let password1 = ref('')
let password2 = ref('')

// 监听输入内容
watch([accountNumber,password,accountNumber1,password1,password2],([newaccountNumber,newpassword,newaccountNumber1,newpassword1,newpassword2],[oldaccountNumber,oldpassword,oldaccountNumber1,oldpassword1,oldpassword2])=>{
	const newList = [newaccountNumber,newpassword,newaccountNumber1,newpassword1,newpassword2]
	const pattern = /[^0-9a-zA-Z]/g
	for (var i = 0; i < newList.length; i++) {
		let content = newList[i].match(pattern)
		if(content){
			accountNumber.value = oldaccountNumber
			password.value = oldpassword
			accountNumber1.value = oldaccountNumber1
			password1.value = oldpassword1
			password2.value = oldpassword2
		}
	}
})

// 提示输入格式
const messageTips = (identification)=>{
	if(identification=='name'){
		popovercontent.value='请输入你的真实姓名'
	}else if(identification=='number'){
		popovercontent.value='请输入6~10位，数字或者字母'
	}else if(identification=='password1'){
		popovercontent.value='请输入6~16位，数字或者字母密码'
	}else if(identification=='password2'){
		popovercontent.value='请确认密码'
	}
	visible.value = true
}

// 验证字段
const verify = ()=>{
	if(!username1.value.trim()){
		popovercontent.value = '请输入真实姓名'
		visible.value = true
		return false
	}
	if(accountNumber1.value.length==0 || !accountNumber1.value.length>6){
		popovercontent.value = '账号长度不够'
		visible.value = true
		console.log('账号长度不够');
		return false
	}
	if(password1.value==password2.value){
		if(password1.value.length>=6 && password1.value.length<=16){
			return true
		}else {
			popovercontent.value = '前后密码长度不足6位'
			visible.value = true
			return false
		}
	}else{
		popovercontent.value = '前后密码不一致，请重新输入'
		visible.value = true
		return false
	}
}

// 发送注册请求
const signin = async ()=>{
	if(!verify()){
		return
	}
	let path = 'login'
	const options = {
		method:'POST',
		body: JSON.stringify({ usernameSign: username1.value, account_numberSign: accountNumber1.value, passwordSign: password2.value,type:'SignIn'})
	}
	try{
		const data = await fetchData(path,options)
		if(data.status==200){
			openMessageBox('注册状态提示',data.message)
			dialogVisible.value = false
			username1.value = ''
			accountNumber1.value = ''
			password1.value = ''
			password2.value = ''
			console.log(data);
		}
	}
	catch{
		let message = '请检查网络'
		openMessageBox('注册状态提示',message)
	}
}

// 发送登录请求
const login = async()=>{
	if(!accountNumber.value || !password.value){
		openMessageBox('登录状态提示','不写账号密码我怎么登录')
		return
	}
	let path = 'login'
	const options = {
		method:'POST',
		body: JSON.stringify({account_numberLogin: accountNumber.value, passwordLogin: password.value})
	}
	try{
		const data = await fetchData(path,options)
		if(data.status==200){
			const date = new Date(data.expiration_timep);
			if(Number(data.userInfo.status)==0){
				openMessageBox('登录状态提示', '你的身份还在审核中，请耐心等待。')
				return false
			}
			let expires = date.toUTCString();
			// 不能加空格
			document.cookie = `token=${data.token};expires=${expires}`;
			const userInfo = {
				'accountNumber': accountNumber.value,
				'addTime': data.userInfo.addTime,
				'username': data.userInfo.username,
				'status': data.userInfo.status,
			}
			mystore.commit('change',{'key': 'userInfo', 'value': userInfo})
			// 备份用户数据信息
			window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
			// 请求该用户状态的相应数据
			mystore.dispatch('equipment/getData')
			// 根据权限状态的不同，给用户请求相应的数据
			router.replace('/ManageMent')
		}else{
			openMessageBox('登录状态提示',data.message)
		}
	}
	catch{
		let message = '请检查网络'
		openMessageBox('注册状态提示',message)
	}
}

	// const handleClose= ()=>{
	// 	console.log(122423);
	// }
</script>

<style lang="less" scoped>
	
	input {
		border: none;
		outline: none;
		border-bottom: 1px solid gray;
		background-color: transparent;
	}
	.loginbox {
		background-image: url('http://127.0.0.1:8000/static/login.png');
		background-size: cover;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 200px;

		.login {
			width: 400px;
			height: 300px;
			background-color: #fff;
			background-image: url('http://127.0.0.1:8000/static/loginfire.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			opacity: 0.7;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			border-radius: 10px;
			padding: 10px 0;

			.userInput {
				display: flex;
				flex-direction: column;
				height: 20%;
				justify-content: space-between;

				span {
					display: flex;
				}
			}

			.controls {
				width: 50%;
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
			}
		}
	}

	.el-dialog {

		.dialog_body {
			width: 100%;
			// border: 1px solid #000;
			// box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
			// border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20px 0;

			.min_dialog_body {
				font-size: 1.2rem;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-end;

				span {
					margin-bottom: 10px;

				}
			}
		}
	}
</style>