/*
 * @Author: shen
 * @Date: 2022-10-21 08:45:39
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 15:43:18
 * @Description:
 */
import ChartCard from './ChartCard'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import type { FC } from 'react'
const TotalSales: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<ChartCard title="总销售额" tooltip="指标说明" total="¥ 182,412" loading={loading} label="日销售额" number="￥3,242">
			<div className="contentFixed">
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						周同比 <span className="trendText">30%</span>
					</span>
					<span className="up">
						<CaretUpOutlined />
					</span>
				</div>
				<div className="trendItem" style={{ marginRight: 16 }}>
					<span>
						日同比 <span className="trendText">21%</span>
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
