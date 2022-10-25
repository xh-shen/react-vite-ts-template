/*
 * @Author: shen
 * @Date: 2022-10-25 13:59:03
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 15:41:26
 * @Description:
 */
import { useState, useEffect } from 'react'
import { sleep } from '@/utils'
import { Card, Col, Row } from 'antd'

import type { FC } from 'react'

const Team: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])

	return (
		<Card title="团队" style={{ marginTop: 16 }} loading={loading} bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}>
			<Row gutter={[16, 16]}>
				<Col span={12}>笨鸟先飞团队</Col>
				<Col span={12}>勤能补拙团队</Col>
				<Col span={12}>每天熬半夜团队</Col>
				<Col span={12}>再接再厉团队</Col>
				<Col span={12}>总会成功的团队</Col>
				<Col span={12}>努力吧少年</Col>
				<Col span={12}>思路慢慢就有了</Col>
			</Row>
		</Card>
	)
}
export default Team
