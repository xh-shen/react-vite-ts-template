/*
 * @Author: shen
 * @Date: 2022-10-23 15:30:19
 * @LastEditors: shen
 * @LastEditTime: 2022-10-23 16:12:02
 * @Description:
 */
import request from '@/request'
import type { StatisticsSaleData, StatisticsVisitData, StatisticsPaymentData, StatisticsDealData } from '@/interfaces'

export const getStatisticsSale = () => request.get<StatisticsSaleData>('/statistics/sale')
export const getStatisticsVisit = () => request.get<StatisticsVisitData>('/statistics/visit')
export const getStatisticsPayment = () => request.get<StatisticsPaymentData>('/statistics/payment')
export const getStatisticsDeal = () => request.get<StatisticsDealData>('/statistics/deal')
