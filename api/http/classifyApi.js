import api from '../api.js'
const { get, post } = api

function getData (params) {
	return get('/test', params)
}

function putData (data) {
	return post('/test2', data)
}


export default {
	getData,
	putData
}