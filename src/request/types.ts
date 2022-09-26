/*
 * @Author: shen
 * @Date: 2022-09-26 09:17:48
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:18:06
 * @Description:
 */
import { AxiosRequestConfig } from 'axios'

export interface Response<T> {
	code: number
	data: T
	msg: string
	[key: string]: any
}

export interface RequestInstance {
	get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<Response<T>>
	post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<Response<T>>
	delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<Response<T>>
	head: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<Response<T>>
	options: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<Response<T>>
	put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<Response<T>>
	patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<Response<T>>
}
