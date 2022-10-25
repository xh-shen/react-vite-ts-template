/*
 * @Author: shen
 * @Date: 2022-10-25 13:59:03
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 14:25:15
 * @Description:
 */
import { useState, useEffect } from 'react'
import { sleep } from '@/utils'
import { GithubOutlined } from '@ant-design/icons'
import { Card } from 'antd'

import type { FC, CSSProperties } from 'react'

const gridStyle: CSSProperties = {
	width: '33.33%'
}

const { Meta } = Card

const Project: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])

	return (
		<Card title="进行中的项目" extra={<a href="#">全部项目</a>} style={{ marginTop: 16 }} loading={loading}>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="那是一种内在的东西，他们到达不了，也无法触及的"
				/>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="This is the description"
				/>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="This is the description"
				/>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="This is the description"
				/>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="This is the description"
				/>
			</Card.Grid>
			<Card.Grid style={gridStyle}>
				<Meta
					title={
						<>
							<GithubOutlined style={{ fontSize: 24 }} />
							<span style={{ marginLeft: 10 }}>Github</span>
						</>
					}
					description="This is the description"
				/>
			</Card.Grid>
		</Card>
	)
}
export default Project
