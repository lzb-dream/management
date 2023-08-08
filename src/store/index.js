import {createStore} from 'vuex'
import superAdmin from './superAdmin.js'

const store =  createStore({
	state:{
		DomainName:'http://127.0.0.1:8000/',
		fontsize:'16px',
		tableData :[
			{
				cargoName: 'FTF无人机套装',
				// addTime:'2023-6-10 19:23:56',
				QuantityStorage: 12,
				QuantityUsed: 2,
				OutboundQuantity: 3,
				LossQuantity: 2,
				AvailableQuantity: 7,
			logs: [{
					date: '2023-7-25',
					ID: 1,
					static: '使用',
					Instructions: '使用者XXX',
					edit:''
				},
				{
					date: '2023-7-25',
					ID: 1,
					static: '使用',
					Instructions: '使用者XXX',
					edit:''
				},
				{
					date: '2023-7-25',
					ID: 1,
					static: '使用',
					Instructions: '使用者XXX',
					edit:''
				},]
			},
		]
	},
	
	getters:{

	},
	mutations:{
		changeFontsize(state,payload){
			state.fontsize = payload.fontsize
		}
	},
	actions:{},
	
	modules:{
		superAdmin
	}
})

export default store