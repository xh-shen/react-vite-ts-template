/*
 * @Author: shen
 * @Date: 2022-09-26 09:17:44
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 13:24:41
 * @Description:
 */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { requestConfig, CODE_MESSAGE } from './config'
import { store } from '@/store'
import { Notification } from '@/utils'

const instance: AxiosInstance = axios.create(requestConfig)

const errorHandler = (error: AxiosError) => {
	const { response }: any = error
	const errorMsg = response?.data?.msg || CODE_MESSAGE[response?.status || 500]
	Notification(errorMsg, 'error')
	return Promise.reject(error)
}
// 添加请求拦截器
instance.interceptors.request.use(config => {
	const state = store.getState()
	config.headers = {
		...config.headers,
		lang: state.app.lang,
		authorization: state.app.token
	}
	return config
}, errorHandler)

// 添加响应拦截器
instance.interceptors.response.use(response => {
	const { data } = response
	// 请求异常提示信息
	if (data.code !== 200) {
		Notification(data.msg, 'error')
	}
	return response
}, errorHandler)

export default instance