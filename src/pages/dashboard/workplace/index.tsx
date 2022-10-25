/*
 * @Author: shen
 * @Date: 2022-09-29 09:03:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 15:27:32
 * @Description:
 */
import { Col, Row } from 'antd'
import { PageContainer } from '@/components'
import { usePrefixCls } from '@/hooks'
import Overview from './components/Overview'
import Project from './components/Project'
import Dynamic from './components/Dynamic'
import QuickNavigation from './components/QuickNavigation'
import RealName from './components/RealName'
import Team from './components/Team'
import './index.less'

import type { FC } from 'react'

const Workplace: FC = () => {
	const prefixCls = usePrefixCls('workplace')

	return (
		<PageContainer className={prefixCls}>
			<Overview />
			<Row gutter={16}>
				<Col xl={18} lg={18} md={24} sm={24} xs={24}>
					<Project />
					<Dynamic />
				</Col>
				<Col xl={6} lg={6} md={24} sm={24} xs={24}>
					<QuickNavigation />
					<RealName />
					<Team />
				</Col>
			</Row>
		</PageContainer>
	)
}

export default Workplace
