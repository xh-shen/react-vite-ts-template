/*
 * @Author: shen
 * @Date: 2022-09-26 09:17:44
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:19:37
 * @Description:
 */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { requestConfig, CODE_MESSAGE } from './config'
import { notification } from 'antd'

const instance: AxiosInstance = axios.create(requestConfig)

const errorHandler = (error: AxiosError) => {
	const { response }: any = error
	const errorMsg = response?.data?.msg || CODE_MESSAGE[response?.status || 500]
	notification.error({
		message: '提示',
		description: errorMsg
	})
	return Promise.reject(error)
}

const getToken = () => ''

// 添加请求拦截器
instance.interceptors.request.use(config => {
	const token: string = getToken()
	if (token) {
		config.headers = {
			...config.headers,
			token
		}
	}
	return config
}, errorHandler)

// 添加响应拦截器
instance.interceptors.response.use(response => {
	const { data } = response
	// 请求异常提示信息
	if (data.code !== 200) {
		notification.error({
			message: '提示',
			description: data.msg
		})
	}
	return response
}, errorHandler)

export default instance
