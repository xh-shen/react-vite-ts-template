/*
 * @Author: shen
 * @Date: 2022-10-25 09:46:00
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 15:23:26
 * @Description:
 */
import { useAppSelector } from '@/store'
import { Card, Col, Row, Avatar, Space, Statistic, Divider } from 'antd'
import { FC } from 'react'

const Overview: FC = () => {
	const info = useAppSelector(state => state.user.info)
	return (
		<Card bodyStyle={{ paddingBottom: 0 }} className="overview">
			<Row gutter={16} align="bottom">
				<Col flex="auto" style={{ marginBottom: 24 }}>
					<div className="detail">
						<Avatar className="avatar" size={{ xs: 64, sm: 64, md: 64, lg: 80, xl: 80, xxl: 80 }} src={info.avatar} />
						<div className="content">
							<div className="welcome">早安，{info.realName}，祝你开心每一天！</div>
							<div>前端菜鸟 |某大厂－某某某事业群－某某平台部－某某技术部</div>
						</div>
					</div>
				</Col>
				<Col flex="200px" style={{ marginBottom: 24 }}>
					<Space size="large">
						<Statistic title="待办" value="8/30" />
						<Divider type="vertical" />
						<Statistic title="项目" value={20} />
						<Divider type="vertical" />
						<Statistic title="团队" value={40} />
					</Space>
				</Col>
			</Row>
		</Card>
	)
}

export default Overview
