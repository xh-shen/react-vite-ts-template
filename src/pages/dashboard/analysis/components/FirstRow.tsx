/*
 * @Author: shen
 * @Date: 2022-10-21 13:33:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-23 16:27:16
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { sleep } from '@/utils'
import { getStatisticsSale, getStatisticsVisit, getStatisticsPayment, getStatisticsDeal } from '@/api/analysis'
import TotalSales from './TotalSales'
import TotalVisits from './TotalVisits'
import TotalPayments from './TotalPayments'
import TotalDeals from './TotalDeals'

import type { FC } from 'react'
import type { StatisticsSaleData, StatisticsVisitData, StatisticsPaymentData, StatisticsDealData } from '@/interfaces'

const FirstRow: FC = () => {
	const [loading, setLoading] = useState(false)
	const [saleData, setSaleData] = useState<StatisticsSaleData>()
	const [visitData, setVisitData] = useState<StatisticsVisitData>()
	const [paymentData, setPaymentData] = useState<StatisticsPaymentData>()
	const [dealData, setDealData] = useState<StatisticsDealData>()
	const span = { xl: 6, lg: 12, md: 12, sm: 12, xs: 24 }

	const getData = async () => {
		setLoading(true)
		try {
			await sleep(1500)
			const [sale, visit, payment, deal] = await Promise.all([
				getStatisticsSale(),
				getStatisticsVisit(),
				getStatisticsPayment(),
				getStatisticsDeal()
			])
			if (sale.code === 200) {
				setSaleData(sale.data)
			}
			if (visit.code === 200) {
				setVisitData(visit.data)
			}
			if (payment.code === 200) {
				setPaymentData(payment.data)
			}
			if (deal.code === 200) {
				setDealData(deal.data)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])
	return (
		<Row gutter={16}>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalSales data={saleData} loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalVisits data={visitData} loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalPayments data={paymentData} loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalDeals data={dealData} loading={loading} />
			</Col>
		</Row>
	)
}

export default FirstRow
