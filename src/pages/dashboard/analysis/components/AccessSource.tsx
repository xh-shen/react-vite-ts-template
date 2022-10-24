/*
 * @Author: shen
 * @Date: 2022-10-24 16:03:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 16:24:21
 * @Description:
 */
import { EChart } from '@/components'
import { Card } from 'antd'

import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const options: EChartsOption = {
	tooltip: {
		trigger: 'item'
	},
	legend: {
		left: 'center'
	},
	grid: {
		top: 30,
		left: 4,
		right: 4,
		bottom: 200,
		containLabel: true
	},
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: '#fff',
				borderWidth: 2
			},
			label: {
				show: false,
				position: 'center'
			},
			emphasis: {
				label: {
					show: true,
					fontSize: '12',
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 1048, name: '搜索引擎' },
				{ value: 735, name: '直接访问' },
				{ value: 580, name: '邮件营销' },
				{ value: 484, name: '联盟广告' }
			],
			animationType: 'scale',
			animationEasing: 'exponentialInOut',
			animationDelay: function () {
				return Math.random() * 100
			}
		}
	]
}

const AccessSource: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Card loading={loading} title="访问来源">
			<EChart height="300px" options={options} />
		</Card>
	)
}

export default AccessSource
