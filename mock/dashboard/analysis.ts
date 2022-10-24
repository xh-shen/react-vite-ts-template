/*
 * @Author: shen
 * @Date: 2022-10-23 15:22:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 14:46:17
 * @Description:
 */
import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

import { resultSuccess, resultError, getRequestToken } from '../_util'

export default [
	{
		url: '/api/statistics/sale',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'total|100000-200000': 200000,
					'day|1000-10000': 10000,
					'weekPercentage|20-30': 30,
					'dayPercentage|10-20': 20
				})
			)
		}
	},
	{
		url: '/api/statistics/visit',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'total|1000-20000': 20000,
					'list|20': [
						{
							'value|10-100': 10,
							date: `@date('yyyy-MM-dd')`
						}
					],
					'day|10-100': 100
				})
			)
		}
	},
	{
		url: '/api/statistics/payment',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'total|50000-100000': 100000,
					'list|20': [
						{
							'value|10-100': 10,
							date: `@date('yyyy-MM-dd')`
						}
					],
					'conversion|1-100': 100
				})
			)
		}
	},
	{
		url: '/api/statistics/deal',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'total|50000-100000': 100000,
					'list|20': [
						{
							'deal|10-100': 10,
							'visit|100-200': 200
						}
					],
					'totalVisit|100000-200000': 200000
				})
			)
		}
	},
	{
		url: '/api/statistics/flowTrend',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'list|24': [
						{
							'value1|10000-60000': 60000,
							'value2|1000-10000': 10000
						}
					]
				})
			)
		}
	},
	{
		url: '/api/statistics/visitTrend',
		method: 'get',
		response: request => {
			const token = getRequestToken(request)
			if (!token) return resultError('Invalid token', 401)
			return resultSuccess<any>(
				Mock.mock({
					'list|12': [
						{
							'value1|10000-80000': 80000,
							'value2|1000-40000': 10000,
							'value3|5000-60000': 60000
						}
					]
				})
			)
		}
	}
] as MockMethod[]
