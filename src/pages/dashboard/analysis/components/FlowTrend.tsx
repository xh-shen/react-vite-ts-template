/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 15:10:54
 * @Description:
 */
import { EChart } from '@/components'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'
import type { StatisticsFlowTrendData } from '@/interfaces'

const options: EChartsOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			lineStyle: {
				width: 1,
				color: '#019680'
			}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		splitLine: {
			show: true,
			lineStyle: {
				width: 1,
				type: 'solid',
				color: 'rgba(226,226,226,0.5)'
			}
		},
		axisTick: {
			show: false
		}
	},
	yAxis: [
		{
			type: 'value',
			max: 80000,
			splitNumber: 4,
			axisTick: {
				show: false
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
				}
			}
		}
	],
	grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
	series: [
		{
			smooth: true,
			type: 'line',
			areaStyle: {}
		},
		{
			smooth: true,
			type: 'line',
			areaStyle: {}
		}
	]
}

const formatData = (list: StatisticsFlowTrendData) => {
	const product = [...new Array(24)].map((_item, index) => `${index}:00`)
	return list.map((item, index) => [product[index], item.value1, item.value2])
}

const FlowTrend: FC<{ list?: StatisticsFlowTrendData }> = ({ list = [] }) => {
	return <EChart options={options} data={formatData(list)} />
}
export default FlowTrend
