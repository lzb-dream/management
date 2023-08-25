import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import {ElButton,
		ElSwitch,
		ElRadioGroup,
		ElRadioButton,
		ElMenu,
		ElIcon,
		ElSubMenu,
		ElMenuItemGroup,
		ElMenuItem,
		ElTable,
		ElTableColumn,
		ElDialog,
		ElPopover,
		ElSelect,
		ElOption
		
		} from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// element的icon使用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
	.component('el-option',ElOption)
	.component('el-select',ElSelect)
	.component('el-popover',ElPopover)
	.component('el-dialog',ElDialog)
	.component('el-table',ElTable)
	.component('el-table-column',ElTableColumn)
	.component('el-menu-item',ElMenuItem)
	.component('el-menu-item-group',ElMenuItemGroup)
	.component('el-icon',ElIcon)
	.component('el-sub-menu',ElSubMenu)
	.component('el-menu',ElMenu)
	.component('el-radio-button',ElRadioButton)
	.component('el-radio-group',ElRadioGroup)
	.component('el-switch',ElSwitch)
	.component('el-button',ElButton)
	.use(router)
	.use(store)
	.mount('#app',true)
