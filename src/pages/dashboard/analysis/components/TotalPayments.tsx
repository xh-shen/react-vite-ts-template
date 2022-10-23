/*
 * @Author: shen
 * @Date: 2022-10-21 13:39:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-23 16:36:49
 * @Description:
 */
import { EChart } from '@/components'
import ChartCard from './ChartCard'
import { FC } from 'react'
import type { EChartsOption } from '@/charts'
import type { StatisticsPaymentData } from '@/interfaces'
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

const TotalPayments: FC<{ loading: boolean; data?: StatisticsPaymentData }> = ({ loading, data }) => {
	return (
		<ChartCard
			title="支付笔数"
			tooltip="指标说明"
			total={data?.total ?? 0}
			loading={loading}
			label="转化率"
			number={`${data?.conversion || 0}%`}
		>
			<EChart height="100%" options={options} data={data?.list?.map(item => [item.date, item.value]) ?? []} />
		</ChartCard>
	)
}
export default TotalPayments
