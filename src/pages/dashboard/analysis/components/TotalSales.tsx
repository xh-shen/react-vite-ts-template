/*
 * @Author: shen
 * @Date: 2022-10-21 08:45:39
 * @LastEditors: shen
 * @LastEditTime: 2022-10-23 16:40:57
 * @Description:
 */
import ChartCard from './ChartCard'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import type { FC } from 'react'
import type { StatisticsSaleData } from '@/interfaces'

const TotalSales: FC<{ loading: boolean; data?: StatisticsSaleData }> = ({ loading, data }) => {
	return (
		<ChartCard
			title="总销售额"
			tooltip="指标说明"
			total={`¥ ${data?.total ?? 0}`}
			loading={loading}
			label="日销售额"
			number={`¥ ${data?.day ?? 0}`}
		>
			<div className="contentFixed">
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						周同比 <span className="trendText">{data?.weekPercentage ?? 0}%</span>
					</span>
					<span className="up">
						<CaretUpOutlined />
					</span>
				</div>
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						日同比 <span className="trendText">{data?.dayPercentage ?? 0}%</span>
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
