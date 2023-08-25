<template>
	<div class="title"><span>FTF后台管理系统</span></div>
	
	<div class="topheard">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
			<el-radio-button :label="false">展开</el-radio-button>
			<el-radio-button :label="true">关闭</el-radio-button>
		</el-radio-group>
		<el-switch v-model="value1" @click="changeColor()"/>
	</div>

	<div class="contentview">
		<div class="sidebar">
			<el-menu class="el-menu-vertical-demo" 
			:collapse="isCollapse" 
			@open="handleOpen"
			@close="handleClose"
			:default-active="defaultActive"
			>
				<el-menu-item v-for="item in $store.state.siderList" 
				:index="item.index" 
				@click="switchView(item.index)"
				:key="item.index">
					<el-icon><Notebook /></el-icon>
					<template #title>{{item.siderName}}</template>
				</el-menu-item>
				
			</el-menu>
		</div>
	
		<div class="mainView">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import router from '@/router'
import { useStore } from 'vuex'

const mystore = useStore()
// 侧边栏开关
let value1 = ref(false)
let backgroundColor = ref('#141414')
let color = ref('#E5EAF3')

// 改变全局颜色
const changeColor = ()=>{
	console.log('调用');
	if(backgroundColor.value=='#141414'){
		backgroundColor.value = '#fff'
		color.value = '#141414'
	}else{
		backgroundColor.value = '#141414'
		color.value = '#E5EAF3'
	}
	let htmltag = document.querySelector('html')
	htmltag.style.backgroundColor = backgroundColor.value
	htmltag.style.color = color.value
}


onMounted(()=>{
	// 初始化全局颜色
	let htmltag = document.querySelector('html')
	htmltag.style.backgroundColor = backgroundColor.value
	htmltag.style.color = color.value
	// 初始化侧边栏选项
	let status = mystore.state.userInfo.status
	if(Number(status)==3){
		const value = [
			{siderName: '个人中心', index: '0', component: '/UserContent'},
			{siderName: '器材管理', index: '1', component: '/FTFContent'},
			{siderName: '财务管理', index: '2', component: '/FinancialManagement'},
		]
		mystore.commit('change',{'key': 'siderList', 'value': value})
	}
})

const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

// 点击切换主界面内容
const switchView = (num)=>{
	mystore.state.siderList.forEach((value)=>{
		if(Number(num)==value.index){
			router.push(value.component);
			window.sessionStorage.setItem('childPath', JSON.stringify({path: value.component, defaultActive: num}))
		}
	})
}
// 默认侧边栏active显示
let defaultActive = ref('0')
// 刷新页面时不会忘记当前页面
if(sessionStorage.getItem('childPath')){
	const sessionData = JSON.parse(sessionStorage.getItem('childPath')) 
	router.replace(sessionData.path)
	defaultActive.value = sessionData.defaultActive
}

</script>

<style scoped lang="less">
	.title {
		width: 100%;
		font-size: 2rem;
		color: #409eff;
		display: flex;
		padding: 20px;
		padding-left: 20px;
	}
	// 控制背景颜色开关颜色
	.el-switch {
		--el-switch-on-color: #6d6d6d;
		--el-switch-off-color:#fff;
	}
	
	// .el-switch::v-deep .el-switch__action {
	// 	background-color: aqua;
	// }
	// 控制侧边栏高度背景颜色
	.el-menu::v-deep {
		height: 500px;
		background-color: transparent;
		border-right: 1px solid gray;
	}
	.topheard {
		margin-bottom: 10px;
	}
	
	// 控制主区域样式
	.contentview {
		width: 100vw;
		display: flex;
		.sidebar {
			// flex-grow: 1;
			padding-right: 10px;
		}
		.mainView {
			flex-grow: 1;
			overflow: hidden;
		}
	}
	
	// 控制侧边栏展开宽度大小
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 150px;
		min-height: 500px;
	}
	
	// 控制侧边栏字体颜色
	.el-menu-item {
		color: inherit;
	}
	
	// 控制侧边栏hover颜色
	.el-menu-item:hover {
		background-color: transparent;
	}
</style>

<!-- // <script setup>
// import RightView from '../components/RightView.vue'
// import LiftView from '../components/LiftView.vue'
// import TopView from '../components/TopView.vue'
// import {ref, onMounted} from 'vue'

// 改变主题颜色

// </script> -->

<style scoped lang="less">
	// //动画在于相应改变的属性起始值
	// @keyframes move-right_viewL {
	// 	from { 
	// 			transform: translateX(0);
	// 			width: 85vw;
				
	// 		}
	// 	to   { 
	// 			transform: translateX(-15vw);
	// 			width: 100vw;
				
	// 		}
	// }
	// @keyframes move-right_viewR {
	// 	from { 
	// 			width: 100vw;
	// 			transform: translateX(-15vw);
	// 		}
	// 	to   { 
	// 			width: 85vw;
	// 			transform: translateX(0);
	// 		}
	// }
	// .animationRightL {
	// 	animation-name: move-right_viewL;
	// 	animation-duration: 1s;
	// 	// 让元素停留在动画的最后位置
	// 	animation-fill-mode: forwards;
	// 	// 让动画反方向做运动
	// 	// animation-direction: reverse;
	// }
	// .animationRightR {
	// 	animation-name: move-right_viewR;
	// 	animation-duration: 1s;
	// 	// 让元素停留在动画的最后位置
	// 	animation-fill-mode: forwards;
	// 	// 让动画反方向做运动
	// 	// animation-direction: reverse;
	// }
		

</style>