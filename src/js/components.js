import mystore from '@/store'

// 获取token
export const getToken = ()=>{
	const cookiesList = document.cookie.split(' ')
	const cookiesDict = {}
	for (var i = 0; i < cookiesList.length; i++) {
		let filed = cookiesList[i].split('=')
		cookiesDict[filed[0]] = filed[1]
	}
	if (cookiesDict['token']){
		return cookiesDict['token']
	}else {
		return false
	}
}

// 网络请求
export async function fetchData(path, options) {
	let url = mystore.state.DomainName + path
	const headers = {
		'Content-Type': 'application/json',
		
	}
	if(path!='login'){
		if(getToken()){
			headers['Authorization'] = getToken()
			console.log('headers',headers);
		}else{
			return false
		}
	}
	const response = await fetch(url, {
			headers,
			...options
		})
	const data = await response.json()
	return data
}

// 格式化时间
export const getTime = ()=>{
	let currentDate = new Date();
	let year = currentDate.getFullYear(); // 获取年份
	let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 获取月份，并补零
	let day = String(currentDate.getDate()).padStart(2, '0'); // 获取日期，并补零
	let hours = String(currentDate.getHours()).padStart(2, '0'); // 获取小时，并补零
	let minutes = String(currentDate.getMinutes()).padStart(2, '0'); // 获取分钟，并补零
	let seconds = String(currentDate.getSeconds()).padStart(2, '0'); // 获取秒钟，并补零
	
	let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	console.log(formattedTime); // 输出: 2023-08-15 15:10:51
	return formattedTime
	
}


// 验证输入内容
export const verify = (value)=>{
	value.trim()
}

// 内容长度不足加零
export const lenthVerify = (length,content,replenishment='')=>{
	let new_content
	content = String(content)
	if (content.length<length){
		new_content = content.padStart(length, replenishment);
		return Number(new_content) 
	}else{
		return Number(content)
	}
	
}


