<template>
	<div class="title"><span>FTF后台管理系统</span></div>
	<div class="topheard">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
			<el-radio-button :label="false">expand</el-radio-button>
			<el-radio-button :label="true">collapse</el-radio-button>
		</el-radio-group>
		
		<el-switch v-model="value1" @click="changeColor()"/>
	</div>

	<div class="contentview">
		
		<div class="sidebar">
			<el-menu class="el-menu-vertical-demo" 
			:collapse="isCollapse" 
			@open="handleOpen"
			@close="handleClose"
			default-active="1"
			>
				<el-menu-item index="1" @click="switchView(1)">
					<el-icon><Notebook /></el-icon>
					<template #title>SuperAdmin</template>
				</el-menu-item>
				<el-menu-item index="2" @click="switchView(2)">
					<el-icon>
						<setting />
					</el-icon>
					<template #title>出入库清单</template>
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

let value1 = ref(false)
let backgroundColor = ref('#141414')
let color = ref('#E5EAF3')
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
	let htmltag = document.querySelector('html')
	htmltag.style.backgroundColor = backgroundColor.value
	htmltag.style.color = color.value
})
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

// 点击切换主界面内容
const switchView = (num)=>{
	switch (num) {
		case 1:
			router.push('UserContent');
			break;
		case 2:
			router.push('FTFContent');
			break;
	}
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
		width: 200px;
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