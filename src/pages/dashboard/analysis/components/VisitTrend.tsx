/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 15:54:56
 * @Description:
 */
import { EChart } from '@/components'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'
import type { StatisticsVisitTrendData } from '@/interfaces'

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
			}
		}
	],
	grid: { left: '1%', right: '1%', top: '3%', bottom: 0, containLabel: true },
	series: [
		{
			type: 'bar'
		},
		{
			type: 'bar'
		},
		{
			type: 'line'
		}
	]
}

const formatData = (list: StatisticsVisitTrendData) => {
	const product = [...new Array(12)].map((_item, index) => `${index + 1}月`)
	return list.map((item, index) => [product[index], item.value1, item.value2, item.value3])
}

const VisitTrend: FC<{ list?: StatisticsVisitTrendData }> = ({ list = [] }) => {
	return <EChart options={options} data={formatData(list)} />
}
export default VisitTrend
