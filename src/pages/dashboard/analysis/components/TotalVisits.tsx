/*
 * @Author: shen
 * @Date: 2022-10-21 08:49:00
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 09:13:54
 * @Description:
 */
import { EChart } from '@/components'
import ChartCard from './ChartCard'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'
import type { StatisticsVisitData } from '@/interfaces'

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

const TotalVisits: FC<{ loading: boolean; data?: StatisticsVisitData }> = ({ loading, data }) => {
	return (
		<ChartCard title="访问量" tooltip="指标说明" total={data?.total} loading={loading} label="日访问量" number={data?.day}>
			<EChart height="100%" options={options} data={data?.list?.map(item => [item.date, item.value]) ?? []} />
		</ChartCard>
	)
}
export default TotalVisits
