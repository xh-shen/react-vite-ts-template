/*
 * @Author: shen
 * @Date: 2022-10-21 16:06:02
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:26:03
 * @Description:
 */
import { EChart } from '@/components'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const options: EChartsOption = {
	legend: {
		show: false
	},
	grid: {
		top: '10',
		left: '5',
		right: '5',
		bottom: '0'
	},
	tooltip: {
		trigger: 'axis'
		// axisPointer: {
		// 	type: 'none'
		// }
	},
	color: ['#8d55de'],
	xAxis: {
		type: 'category',
		show: false,
		boundaryGap: false
	},
	yAxis: {
		show: false
	},
	series: [
		{
			type: 'line',
			areaStyle: {
				// color: '#8d55de',
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: '#8d55de' // 0% 处的颜色
						},
						{
							offset: 1,
							color: '#fff' // 100% 处的颜色
						}
					],
					global: false // 缺省为 false
				},
				opacity: 0.7
			},
			lineStyle: {
				width: 1
			},
			showSymbol: false,
			clip: false,
			smooth: true
		}
	]
}

const Visits: FC = () => {
	const data = [
		{ x: '2021-01-25', y: 73 },
		{ x: '2021-01-26', y: 82 },
		{ x: '2021-01-27', y: 41 },
		{ x: '2021-01-28', y: 93 },
		{ x: '2021-01-29', y: 42 },
		{ x: '2021-01-30', y: 73 },
		{ x: '2021-01-31', y: 59 },
		{ x: '2021-02-01', y: 64 },
		{ x: '2021-02-02', y: 54 },
		{ x: '2021-02-03', y: 91 },
		{ x: '2021-02-04', y: 62 },
		{ x: '2021-02-05', y: 83 },
		{ x: '2021-02-06', y: 80 },
		{ x: '2021-02-07', y: 51 },
		{ x: '2021-02-08', y: 62 },
		{ x: '2021-02-09', y: 63 },
		{ x: '2021-02-10', y: 87 }
	]
	return <EChart options={options} data={data.map(item => Object.values(item))} />
}
export default Visits
