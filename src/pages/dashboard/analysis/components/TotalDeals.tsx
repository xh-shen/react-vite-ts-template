/*
 * @Author: shen
 * @Date: 2022-10-21 13:39:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 15:33:07
 * @Description:
 */
import { EChart } from '@/components'
import ChartCard from './ChartCard'
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
			data: [
				[22, 18],
				[13, 10],
				[32, 21],
				[43, 27],
				[21, 10],
				[14, 7],
				[13, 6],
				[10, 6],
				[14, 8],
				[12, 10],
				[19, 17],
				[11, 7],
				[33, 24],
				[12, 7],
				[29, 22],
				[19, 3],
				[42, 22],
				[16, 15],
				[19, 6],
				[12, 8],
				[17, 15],
				[15, 15]
			],
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

const TotalDeals: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<ChartCard title="总成交数" tooltip="指标说明" total="23,983" loading={loading} label="总访问数" number="35,378">
			<EChart height="100%" options={options} />
		</ChartCard>
	)
}
export default TotalDeals
