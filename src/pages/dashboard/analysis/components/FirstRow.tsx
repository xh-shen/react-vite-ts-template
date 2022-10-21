/*
 * @Author: shen
 * @Date: 2022-10-21 13:33:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:21:32
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { sleep } from '@/utils'
import TotalSales from './TotalSales'
import TotalVisits from './TotalVisits'
import TotalPayments from './TotalPayments'
import TotalDeals from './TotalDeals'

import type { FC } from 'react'

const FirstRow: FC = () => {
	const [loading, setLoading] = useState(false)
	const span = { xl: 6, lg: 12, md: 12, sm: 12, xs: 24 }

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])
	return (
		<Row gutter={16}>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalSales loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalVisits loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalPayments loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<TotalDeals loading={loading} />
			</Col>
		</Row>
	)
}

export default FirstRow
