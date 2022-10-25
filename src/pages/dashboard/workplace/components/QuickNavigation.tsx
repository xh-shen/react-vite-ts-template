/*
 * @Author: shen
 * @Date: 2022-10-25 13:59:03
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 15:36:15
 * @Description:
 */
import { useState, useEffect } from 'react'
import { sleep } from '@/utils'
import { Card, Button, Row, Col } from 'antd'

import type { FC } from 'react'

const QuickNavigation: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])

	return (
		<Card title="快速开始 / 便捷导航" style={{ marginTop: 16 }} loading={loading}>
			<Row gutter={[16, 16]}>
				<Col span={6}>首页</Col>
				<Col span={6}>表格页</Col>
				<Col span={6}>权限管理</Col>
				<Col span={6}>用户管理</Col>
				<Col span={6}>表单页</Col>
				<Col span={6}>工作台</Col>
				<Col span={6}>
					<Button type="primary" size="small" ghost>
						添加
					</Button>
				</Col>
			</Row>
		</Card>
	)
}
export default QuickNavigation
