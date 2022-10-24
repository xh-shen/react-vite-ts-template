/*
 * @Author: shen
 * @Date: 2022-09-29 09:03:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-20 16:46:00
 * @Description:
 */
import { useEffect, useRef, useState } from 'react'
import { Card } from 'antd'
import { PageContainer } from '@/components'
import { EChart } from '@/components'

import type { FC } from 'react'
import type { EChartsOption } from '@/charts'
import { useECharts } from '@/hooks'

const baseOptions: EChartsOption = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar',
			showBackground: true,
			backgroundStyle: {
				color: 'rgba(180, 180, 180, 0.2)'
			}
		}
	]
}

const options2: EChartsOption = {
	title: [
		{
			text: 'Tangential Polar Bar Label Position (middle)'
		}
	],
	polar: {
		radius: [30, '80%']
	},
	angleAxis: {
		max: 4,
		startAngle: 75
	},
	radiusAxis: {
		type: 'category',
		data: ['a', 'b', 'c', 'd']
	},
	tooltip: {},
	series: {
		type: 'bar',
		data: [2, 1.2, 2.4, 3.6],
		coordinateSystem: 'polar',
		label: {
			show: true,
			position: 'middle',
			formatter: '{b}: {c}'
		}
	}
}

const Dashboard: FC = () => {
	const domRef = useRef<HTMLDivElement>(null)
	const [options, setOptions] = useState(baseOptions)

	useECharts(domRef, options2)

	useEffect(() => {
		setTimeout(() => {
			setOptions({
				series: [
					{
						data: [1200, 409, 1500, 1810, 209, 1110, 301],
						type: 'bar',
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(180, 180, 180, 0.2)'
						}
					}
				]
			})
		}, 2000)
	}, [])

	return (
		<PageContainer>
			<div>
				<Card title="默认" loading={true}>
					<EChart height={300} options={options} />
				</Card>
				<Card title="组件" style={{ marginTop: 20 }}>
					<EChart height={300} options={options2} />
				</Card>
				<Card title="hooks" style={{ marginTop: 20 }}>
					<div ref={domRef} style={{ width: '100%', height: 300 }}></div>
				</Card>
			</div>
		</PageContainer>
	)
}

export default Dashboard
