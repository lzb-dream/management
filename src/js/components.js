import mystore from '@/store'

export async function fetchData(path, options) {
	let url = mystore.state.DomainName + path
	console.log(url);
	const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json'
				// 'Authorization': 'Bearer token123'
			},
			...options
		})
	const data = await response.json()
	return data
}