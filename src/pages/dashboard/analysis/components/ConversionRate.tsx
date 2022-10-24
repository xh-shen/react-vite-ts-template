/*
 * @Author: shen
 * @Date: 2022-10-24 16:03:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 16:16:58
 * @Description:
 */
import { EChart } from '@/components'
import { Card } from 'antd'

import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const options: EChartsOption = {
	legend: {
		bottom: 0,
		data: ['访问', '购买']
	},
	tooltip: {},
	radar: {
		radius: '60%',
		splitNumber: 8,
		indicator: [
			{
				name: '电脑'
			},
			{
				name: '充电器'
			},
			{
				name: '耳机'
			},
			{
				name: '手机'
			},
			{
				name: 'Ipad'
			},
			{
				name: '耳机'
			}
		]
	},
	series: [
		{
			type: 'radar',
			symbolSize: 0,
			areaStyle: {
				shadowBlur: 0,
				shadowColor: 'rgba(0,0,0,.2)',
				shadowOffsetX: 0,
				shadowOffsetY: 10,
				opacity: 1
			},
			data: [
				{
					value: [90, 50, 86, 40, 50, 20],
					name: '访问',
					itemStyle: {
						color: '#F2637B'
					}
				},
				{
					value: [70, 75, 70, 76, 20, 85],
					name: '购买',
					itemStyle: {
						color: '#726bf1'
					}
				}
			]
		}
	]
}

const ConversionRate: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Card loading={loading} title="转化率">
			<EChart height="300px" options={options} />
		</Card>
	)
}

export default ConversionRate
