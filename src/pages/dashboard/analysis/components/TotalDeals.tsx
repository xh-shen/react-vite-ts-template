/*
 * @Author: shen
 * @Date: 2022-10-21 13:39:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 09:14:01
 * @Description:
 */
import { EChart } from '@/components'
import ChartCard from './ChartCard'
import type { FC } from 'react'
import type { EChartsOption } from '@/charts'
import type { StatisticsDealData } from '@/interfaces'
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
		position: 'top'
	},
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
			color: '#61c2c4',
			symbolSize: 10,
			type: 'scatter',
			emphasis: {
				itemStyle: {
					borderColor: '#000',
					borderWidth: 1
				}
			}
		}
	]
}

const TotalDeals: FC<{ loading: boolean; data?: StatisticsDealData }> = ({ loading, data }) => {
	return (
		<ChartCard
			title="总成交数"
			tooltip="指标说明"
			total={data?.total}
			loading={loading}
			label="总访问数"
			number={data?.totalVisit}
		>
			<EChart height="100%" options={options} data={data?.list?.map(item => [item.deal, item.visit]) ?? []} />
		</ChartCard>
	)
}
export default TotalDeals
