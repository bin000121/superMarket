// 节流
export function throttle (fn, delay) {
	let pre = 0
	return (...args) => {
		let now = Date.now()
		if (now - pre > delay) {
			setTimeout(() => {
				pre = now
				fn(...args)
			}, delay)
		}
	}
}

// 防抖

export function debounce (fn, delay) {
	let timer = null
	return (...args) => {
		clearTimeout(timer)
		setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

// 深拷贝
export function cloneDeep (obj) {
	if (typeof obj ==='function' || typeof obj !=='object') return obj
	let n = null
	if (obj === n || obj === undefined) return obj
	let cloneTarget = Array.isArray(obj) ? [] : {}
	for (let key in obj) {
		if (!obj.hasOwnProperty(key)) continue
		cloneTarget = obj[key] && typeof obj === 'object' ? cloneDeep(obj[key]) : obj[key]
	}
	return cloneTarget
}