/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:34:06
 * @Description:
 */
import { EChart } from '@/components'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const options: EChartsOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
		}
	},
	legend: {
		show: false
	},
	grid: {
		top: '30',
		left: '5',
		right: '5',
		bottom: '0',
		containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		}
	],
	yAxis: [
		{
			type: 'value'
		}
	],
	series: [
		{
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 1
			},
			showSymbol: false,
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [140, 232, 101, 264, 90, 340, 250]
		},
		{
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 1
			},
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [120, 282, 111, 234, 220, 340, 310]
		}
	]
}

const FlowTrend: FC = () => {
	return <EChart options={options} />
}
export default FlowTrend
