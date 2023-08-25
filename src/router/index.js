import {
	createRouter,
	createWebHistory
} from 'vue-router';
import ManageMent from '@/pages/ManageMent.vue';
import FTFContent from '@/components/contentArea/FTFContent.vue'
import UserContent from '@/components/contentArea/UserContent.vue'
import UserLogin from '@/pages/UserLogin.vue'
import ApplyForEquipment from '@/components/contentArea/ApplyForEquipment.vue'
import ApplyForReimbursement from '@/components/contentArea/ApplyForReimbursement.vue'
import FinancialManagement from '@/components/contentArea/FinancialManagement.vue'
import ClassHourManagement from '@/components/contentArea/ClassHourManagement.vue'
import ClassDeclaration from '@/components/contentArea/ClassDeclaration.vue'


const routes = [
	{
		path: '/UserLogin',
		// 命名视图component要加S否则无效
		component: UserLogin,
	},
	
	{
		path: '/ManageMent',
		// 命名视图component要加S否则无效
		component: ManageMent,
		children: [
			{
				path: '/ClassHourManagement',
				component: ClassHourManagement
			},
			{
				path: '/ClassDeclaration',
				component: ClassDeclaration
			},
			// 财务管理
			{
				path: '/FinancialManagement',
				component: FinancialManagement
			},
			{
				path: '/ApplyForReimbursement',
				component: ApplyForReimbursement
			},
			{
				path: '/ApplyForEquipment',
				component: ApplyForEquipment
			},
			// 器材管理
			{
				path: '/FTFContent',
				component: FTFContent
			},
			// 个人中心
			{
				path: '/UserContent',
				component: UserContent
			},
			{
				path: '',
				component: UserContent
			}
		],
	},
	
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;