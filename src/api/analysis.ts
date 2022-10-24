/*
 * @Author: shen
 * @Date: 2022-10-23 15:30:19
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 14:16:25
 * @Description:
 */
import request from '@/request'
import type {
	StatisticsSaleData,
	StatisticsVisitData,
	StatisticsPaymentData,
	StatisticsDealData,
	StatisticsFlowTrendData,
	StatisticsVisitTrendData
} from '@/interfaces'

export const getStatisticsSale = () => request.get<StatisticsSaleData>('/statistics/sale')
export const getStatisticsVisit = () => request.get<StatisticsVisitData>('/statistics/visit')
export const getStatisticsPayment = () => request.get<StatisticsPaymentData>('/statistics/payment')
export const getStatisticsDeal = () => request.get<StatisticsDealData>('/statistics/deal')
export const getStatisticsFlowTrend = () => request.get<{ list: StatisticsFlowTrendData }>('/statistics/flowTrend')
export const getStatisticsVisitTrend = () => request.get<{ list: StatisticsVisitTrendData }>('/statistics/visitTrend')
