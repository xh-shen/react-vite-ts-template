/*
 * @Author: shen
 * @Date: 2022-09-26 09:17:08
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:17:10
 * @Description:
 */
import { AxiosRequestConfig } from 'axios'
import instance from './instance'
import { RequestInstance, Response } from './types'
export * from './config'

const request: RequestInstance = {
	get: async function <T = Record<string, any>>(url: string, config?: AxiosRequestConfig) {
		const { data } = await instance.get<Response<T>>(url, config)
		return data
	},
	post: async function <T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig) {
		const { data: postData } = await instance.post<Response<T>>(url, data, config)
		return postData
	},
	delete: async function <T = Record<string, any>>(url: string, config?: AxiosRequestConfig) {
		const { data } = await instance.delete<Response<T>>(url, config)
		return data
	},
	head: async function <T = Record<string, any>>(url: string, config?: AxiosRequestConfig) {
		const { data } = await instance.get<Response<T>>(url, config)
		return data
	},
	options: async function <T = Record<string, any>>(url: string, config?: AxiosRequestConfig) {
		const { data } = await instance.get<Response<T>>(url, config)
		return data
	},
	put: async function <T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig) {
		const { data: postData } = await instance.post<Response<T>>(url, data, config)
		return postData
	},
	patch: async function <T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig) {
		const { data: postData } = await instance.post<Response<T>>(url, data, config)
		return postData
	}
}

export default request
