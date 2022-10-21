/*
 * @Author: shen
 * @Date: 2022-10-20 16:59:56
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 09:13:38
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import { FC, ReactNode } from 'react'

interface ChartCardProps {
	title: string
	total: number | string
	label?: string
	number?: number | string
	tooltip?: string
	loading?: boolean
	footer?: ReactNode
	children?: ReactNode
}

const ChartCard: FC<ChartCardProps> = ({ title, tooltip, total, loading, number, label, footer, children }) => {
	const prefixCls = usePrefixCls('analysis-card')
	return (
		<Card className={prefixCls} bodyStyle={{ padding: '20px 24px 8px' }} loading={loading}>
			<div className={`${prefixCls}-top`}>
				<div className={`${prefixCls}-meta`}>
					<span className={`${prefixCls}-meta-title`}>{title}</span>
					<Tooltip title={tooltip}>
						<ExclamationCircleOutlined className={`${prefixCls}-meta-action`} />
					</Tooltip>
				</div>
				<div className={`${prefixCls}-total`}>
					<span>{total}</span>
				</div>
			</div>
			<div className={`${prefixCls}-center`} style={{ height: '46px' }}>
				{children}
			</div>
			<div className={`${prefixCls}-footer`}>
				{footer ? (
					footer
				) : (
					<div className={`${prefixCls}-field`}>
						<span className={`${prefixCls}-field-label`}>{label}</span>
						<span className={`${prefixCls}-field-number`}>{number}</span>
					</div>
				)}
			</div>
		</Card>
	)
}

export default ChartCard
