/*
 * @Author: shen
 * @Date: 2022-09-26 09:17:25
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 15:28:06
 * @Description:
 */
import { AxiosRequestConfig } from 'axios'
import config from '@/config'
import i18n from '@/locale'

export const CODE_MESSAGE: { [prop: number]: string } = {
	200: i18n.t('request.200'),
	201: i18n.t('request.201'),
	400: i18n.t('request.400'),
	401: i18n.t('request.401'),
	403: i18n.t('request.403'),
	404: i18n.t('request.404'),
	406: i18n.t('request.406'),
	500: i18n.t('request.500'),
	502: i18n.t('request.502'),
	503: i18n.t('request.503'),
	504: i18n.t('request.504')
}

export const requestConfig: AxiosRequestConfig = {
	baseURL: config.baseApi,
	timeout: config.timeout,
	withCredentials: true
}
