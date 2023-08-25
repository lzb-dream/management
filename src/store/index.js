import {createStore} from 'vuex'
import equipment from './equipment.js'
import classTime from './classTime.js'
import finance from './finance.js'

const store =  createStore({
	state:{
		userInfo:{
			'accountNumber': '',
			'addTime' : '',
			'username' : '',
			'status': '',
		},
		DomainName:'/api',
		siderList:[]
	},
	
	getters:{

	},
	mutations:{
		changeUserInfo(state,payload){
			state['userInfo'] = payload['callBack'](state['userInfo'])
		},
		// 改变全部
		change(state,payload){
			state[payload['key']] = payload.value
		}
	},
	actions:{
		
	},
	modules:{
		equipment,
		classTime,
		finance
	}
})

export default store