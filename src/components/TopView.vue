<template>
	<div class="box">
		<div class="heard">
			<span>FTF后台管理系统</span>
			<div class="option">
				<el-switch v-model="value1" :change="props.changeColor()"/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref,defineProps } from 'vue';
const props = defineProps(['changeColor'])
let value1 = ref(true)
</script>

<style scoped lang="less">
	.el-switch {
		--el-switch-on-color: #6d6d6d;
		--el-switch-off-color:#fff;
	}
	.el-switch::v-deep .el-switch__action {
		background-color: aqua;
	}
	.box { 
		width: 100%;
		padding: 0 50px;
		border-bottom: 1px solid #aeb0b4;
		.heard {
			display: flex;
			justify-content: space-between;
		}
	}
</style>