/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 15:11:43
 * @Description:
 */
import { useState, useEffect } from 'react'
import { Card, DatePicker } from 'antd'
import { sleep } from '@/utils'
import { getStatisticsFlowTrend, getStatisticsVisitTrend } from '@/api/analysis'
import FlowTrend from './FlowTrend'
import VisitTrend from './VisitTrend'

import type { FC } from 'react'
import type { StatisticsFlowTrendData, StatisticsVisitTrendData } from '@/interfaces'

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
const TwoRow: FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [activeTabKey, setActiveTabKey] = useState<string>('flow')
	const [flowTrendData, setFlowTrendData] = useState<StatisticsFlowTrendData>()
	const [visitTrentData, setVisitTrentData] = useState<StatisticsVisitTrendData>()

	const getData = async () => {
		setLoading(true)
		try {
			await sleep(1800)
			const [flowTrend, visitTrent] = await Promise.all([getStatisticsFlowTrend(), getStatisticsVisitTrend()])
			if (flowTrend.code === 200) {
				setFlowTrendData(flowTrend.data.list)
			}
			if (visitTrent.code === 200) {
				setVisitTrentData(visitTrent.data.list)
			}
		} finally {
			setLoading(false)
		}
	}

	const contentList: Record<string, React.ReactNode> = {
		flow: <FlowTrend list={flowTrendData} />,
		visit: <VisitTrend list={visitTrentData} />
	}

	useEffect(() => {
		getData()
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
