const baseURL = 'http://localhost:3001'

function axios(method, url, params) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data: params,
			method,
			timeout: 3000,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

function deepCopy(obj) {
	let n = null
	if (obj = null && typeof obj == 'undefined') return
	let objClone = Array.isArray(obj) ? [] : {}
		if (typeof obj == 'object') {
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (obj[key] && typeof obj[key] == 'object') {
						objClone[key] = deepCopy(obj[key])
					} else {
						objClone[key] = obj[key]
					}
				}
			}
		}
	return objClone
}

function debounce(func, wait) {
    let timeout
    return () => {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.call(context, args)
        }, wait)
		
    }
}

export default {
	get: (url, params) => axios('GET', url, params),
	post: (url, params) => axios('POST', url, params),
	put: (url, params) => axios('PUT', url, params),
	delete: (url, params) => axios('DELETE', url, params),
	deepCopy,
	debounce
}
