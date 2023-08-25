import { fetchData } from '@/js/components'

export default {
			namespaced:true,
			state:{
				tableData :[],

			},
			getters:{
				
			},
			mutations:{
				// 重新更新数据
				change(state,payload){
					state[payload['key']] = payload.value
				},
				unshiftTableData(state,payload){
					state.tableData.unshift(payload)
					console.log(state.tableData);
				},
			},
			actions:{
				// 获取后端器材表格数据
				async getData(context){
					const data = await fetchData('cargo_MaterielManage', {
						method: 'GET',
					})
					const materiel = data.data
					context.commit('change',{'key': 'tableData', 'value': materiel})
				},
			}
		}