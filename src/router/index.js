import {
	createRouter,
	createWebHistory
} from 'vue-router';
import ManageMent from '@/pages/ManageMent.vue';
import FTFContent from '@/components/contentArea/FTFContent.vue'
import UserContent from '@/components/contentArea/UserContent.vue'
import UserLogin from '@/pages/UserLogin.vue'


const routes = [{
		path: '/UserLogin',
		// 命名视图component要加S否则无效
		component: UserLogin,
	},
	{
		path: '/ManageMent',
		// 命名视图component要加S否则无效
		component: ManageMent,
		children: [{
				path: '/FTFContent',
				component: FTFContent
			},
			{
				path: '/UserContent',
				component: UserContent
			},
			{
				path: '',
				component: UserContent
			}
		],
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;