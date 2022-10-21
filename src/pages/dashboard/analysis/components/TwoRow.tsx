/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:39:02
 * @Description:
 */
import { useState, useEffect } from 'react'
import { Card, DatePicker } from 'antd'
import { sleep } from '@/utils'
import FlowTrend from './FlowTrend'
import Visits from './Visits'
import type { FC } from 'react'

const { RangePicker } = DatePicker

const tabList = [
	{
		key: 'flow',
		tab: '流量趋势'
	},
	{
		key: 'visit',
		tab: '访问量'
	}
]
const contentList: Record<string, React.ReactNode> = {
	flow: <FlowTrend />,
	visit: <Visits />
}

const TwoRow: FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [activeTabKey, setActiveTabKey] = useState<string>('flow')

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])

	return (
		<Card
			loading={loading}
			tabList={tabList}
			activeTabKey={activeTabKey}
			tabBarExtraContent={<RangePicker />}
			onTabChange={setActiveTabKey}
		>
			{contentList[activeTabKey]}
		</Card>
	)
}

export default TwoRow
