// const baseURL = 'http://localhost:5555'

// function axios(method, url, params) {
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: baseURL + url,
// 			data: params,
// 			method,
// 			timeout: 3000,
// 			success: (res) => {
// 				resolve(res)
// 			},
// 			fail: (err) => {
// 				reject(err)
// 			}
// 		})
// 	})
// }

// function deepCopy(obj) {
// 	let n = null
// 	if (obj === null && typeof obj == 'undefined') return
// 	let objClone = Array.isArray(obj) ? [] : {}
// 		if (typeof obj == 'object') {
// 			for (let key in obj) {
// 				if (obj.hasOwnProperty(key)) {
// 					if (obj[key] && typeof obj[key] == 'object') {
// 						objClone[key] = deepCopy(obj[key])
// 					} else {
// 						objClone[key] = obj[key]
// 					}
// 				}
// 			}
// 		}
// 	return objClone
// }

// export default {
// 	get: (url, params) => axios('GET', url, params),
// 	post: (url, params) => axios('POST', url, params),
// 	put: (url, params) => axios('PUT', url, params),
// 	delete: (url, params) => axios('DELETE', url, params),
// 	deepCopy
// }

import Request from 'luch-request'

const http = new Request()
const baseURL = 'http://192.168.2.89:5555'

function httpApi (method, url, data) {
	let config = {
		method,
		url: baseURL + url,
		dataType: 'json',
		timeout: 3000,
		params: ['GET', 'DELETE'].includes(method) ? data : null,
		data: ['POST', 'PUT'].includes(method) ? data : null,
		headers: {
			'Content-Type': "application/json"
		}
	}
	return new Promise((resolve, reject) => {
		http.request(config).then(res => resolve(res)).catch(err => reject(err))
	})
}

export default {
	get: (url, data) => httpApi('GET', url, data),
	post: (url, data) => httpApi('POST', url, data),
	put: (url, data) => httpApi('PUT', url, data),
	del: (url, data) => httpApi('DELETE', url, data)
}

