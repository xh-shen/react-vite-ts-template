/*
 * @Author: shen
 * @Date: 2022-10-21 08:45:39
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 09:13:33
 * @Description:
 */
import { CountUp } from '@/components'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import ChartCard from './ChartCard'

import type { FC } from 'react'
import type { StatisticsSaleData } from '@/interfaces'

const TotalSales: FC<{ loading: boolean; data?: StatisticsSaleData }> = ({ loading, data }) => {
	return (
		<ChartCard
			title="总销售额"
			tooltip="指标说明"
			totalPrefix="¥ "
			total={data?.total}
			loading={loading}
			label="日销售额"
			numberPrefix="¥ "
			number={data?.day}
		>
			<div className="contentFixed">
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						周同比 <CountUp className="trendText" suffix="%" end={data?.weekPercentage ?? 0} separator="," />
					</span>
					<span className="up">
						<CaretUpOutlined />
					</span>
				</div>
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						日同比 <CountUp className="trendText" suffix="%" end={data?.dayPercentage ?? 0} separator="," />
					</span>
					<span className="down">
						<CaretDownOutlined />
					</span>
				</div>
			</div>
		</ChartCard>
	)
}
export default TotalSales
