/*
 * @Author: shen
 * @Date: 2022-10-21 13:39:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 15:06:50
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
		trigger: 'axis',
		axisPointer: {
			type: 'none'
		}
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
			type: 'bar',
			clip: false,
			barMaxWidth: 10,
			emphasis: {
				itemStyle: {
					borderColor: '#000',
					borderWidth: 1
				}
			}
		}
	]
}

const TotalPayments: FC<{ loading: boolean }> = ({ loading }) => {
	const data = [
		{ x: '2021-01-25', y: 7 },
		{ x: '2021-01-26', y: 5 },
		{ x: '2021-01-27', y: 4 },
		{ x: '2021-01-28', y: 2 },
		{ x: '2021-01-29', y: 4 },
		{ x: '2021-01-30', y: 7 },
		{ x: '2021-01-31', y: 5 },
		{ x: '2021-02-01', y: 6 },
		{ x: '2021-02-02', y: 5 },
		{ x: '2021-02-03', y: 9 },
		{ x: '2021-02-04', y: 6 },
		{ x: '2021-02-05', y: 3 },
		{ x: '2021-02-06', y: 1 },
		{ x: '2021-02-07', y: 5 },
		{ x: '2021-02-08', y: 3 },
		{ x: '2021-02-09', y: 6 },
		{ x: '2021-02-10', y: 5 }
	]
	return (
		<ChartCard title="支付笔数" tooltip="指标说明" total="62,098" loading={loading} label="转化率" number="60%">
			<EChart height="100%" options={options} data={data.map(item => Object.values(item))} />
		</ChartCard>
	)
}
export default TotalPayments
