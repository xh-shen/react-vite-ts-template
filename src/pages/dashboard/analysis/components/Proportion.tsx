/*
 * @Author: shen
 * @Date: 2022-10-24 16:03:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 16:29:36
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

	series: [
		{
			name: '成交占比',
			type: 'pie',
			radius: '80%',
			center: ['50%', '50%'],
			color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
			data: [
				{ value: 200, name: '电子产品' },
				{ value: 310, name: '服装' },
				{ value: 274, name: '化妆品' },
				{ value: 400, name: '家居' }
			].sort(function (a, b) {
				return a.value - b.value
			}),
			roseType: 'radius',
			animationType: 'scale',
			animationEasing: 'exponentialInOut',
			animationDelay: function () {
				return Math.random() * 400
			}
		}
	]
}

const Proportion: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Card loading={loading} title="成交占比">
			<EChart height="300px" options={options} />
		</Card>
	)
}

export default Proportion
