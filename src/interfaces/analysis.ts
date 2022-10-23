/*
 * @Author: shen
 * @Date: 2022-10-23 15:31:23
 * @LastEditors: shen
 * @LastEditTime: 2022-10-23 16:16:04
 * @Description:
 */
export interface StatisticsSaleData {
	total: number
	day: number
	weekPercentage: number
	dayPercentage: number
}
export interface StatisticsVisitData {
	total: number
	day: number
	list: { value: number; date: string }[]
}

export interface StatisticsPaymentData {
	total: number
	conversion: number
	list: { value: number; date: string }[]
}

export interface StatisticsDealData {
	total: number
	totalVisit: number
	list: { deal: number; visit: string }[]
}
