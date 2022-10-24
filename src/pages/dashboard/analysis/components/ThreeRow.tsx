/*
 * @Author: shen
 * @Date: 2022-10-21 13:33:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 16:26:36
 * @Description:
 */
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { sleep } from '@/utils'
import ConversionRate from './ConversionRate'
import AccessSource from './AccessSource'
import Proportion from './Proportion'

import type { FC } from 'react'

const ThreeRow: FC = () => {
	const [loading, setLoading] = useState(false)
	const span = { xl: 8, lg: 8, md: 24, sm: 24, xs: 24 }

	const getData = async () => {
		setLoading(true)
		try {
			await sleep(2000)
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
				<ConversionRate loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<AccessSource loading={loading} />
			</Col>
			<Col {...span} style={{ marginBottom: 16 }}>
				<Proportion loading={loading} />
			</Col>
		</Row>
	)
}

export default ThreeRow
