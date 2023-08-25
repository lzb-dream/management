<template>
	<router-view></router-view>
</template>

<script setup>
import {onMounted,onBeforeUnmount} from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import {getToken} from '@/js/components'
var Timer

const mystore = useStore()
// 初始化器材数据
if(getToken()){
	mystore.dispatch('equipment/getData')
}


// 用户个人信息拉去
const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
mystore.commit('change', {'key': 'userInfo', 'value': userInfo})



// 判断token是否过期
onMounted(()=>{
	clearInterval(Timer)
	judegPath()
	Timer = setInterval(()=>{
		judegPath(true)
		console.log('验证')
	},60000)
})

// 关闭网站清空计时器
onBeforeUnmount(()=>{
	clearInterval(Timer)
})

// token验证

function judegPath(vierf){
	const cookiesList = document.cookie.split(' ')
	const cookiesDict = {}
	for (var i = 0; i < cookiesList.length; i++) {
		let filed = cookiesList[i].split('=')
		cookiesDict[filed[0]] = filed[1]
	}
	if(cookiesDict['token']){
		if(vierf){
			return true
		}
		router.replace('/ManageMent')
	}else{
		router.replace('/UserLogin')
	}
}


	
// import {computed} from 'vue';
// import {useStore} from 'vuex'
// const mystore = useStore()
// const fontsizeChange = ()=>{
// 	// 根据视口宽度计算并更新动态字体大小
// 	// 我们可以获取当前窗口的宽度  document.documentElement.clientWidth
// 	//window.innerWidth 返回的是浏览器窗口的视口（viewport）宽度，包括滚动条的宽度  window.innerWidth
// 	const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
// 	mystore.commit('changeFontsize',{'fontsize':(viewportWidth * 0.019)+'px'})// 以视口宽度的百分比为基准进行缩放
// }
// // 在网页渲染后对字体大小进行一次更新
// onMounted(()=>{
// 	const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
// 	mystore.commit('changeFontsize',{'fontsize':(viewportWidth * 0.019)+'px'})
// })
// window.addEventListener('resize', fontsizeChange)

// 字体大小
// const fontsize = computed(() => mystore.state.fontsize);
// onBeforeUnmount(()=>{
// 	window.removeEventListener('resize',fontsizeChange)
// })


</script> 

<style lang="less">
body {
  font-size: 16px; /* 设置根元素字体大小 */
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
ul {
	list-style: none;
}
a {
	text-decoration: none;
}
</style>
