/*
 * @Author: shen
 * @Date: 2022-10-20 16:59:56
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 09:14:29
 * @Description:
 */
import { CountUp } from '@/components'
import { usePrefixCls } from '@/hooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import type { FC, ReactNode } from 'react'

interface ChartCardProps {
	title: string
	total?: number
	label?: string
	number?: number
	tooltip?: string
	loading?: boolean
	footer?: ReactNode
	children?: ReactNode
	totalPrefix?: string
	totalSuffix?: string
	numberPrefix?: string
	numberSuffix?: string
}

const ChartCard: FC<ChartCardProps> = ({
	title,
	tooltip,
	total = 0,
	totalPrefix = '',
	totalSuffix = '',
	loading,
	number = 0,
	numberPrefix = '',
	numberSuffix = '',
	label,
	footer,
	children
}) => {
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
					<CountUp prefix={totalPrefix} suffix={totalSuffix} end={total} separator="," />
				</div>
			</div>
			<div className={`${prefixCls}-center`} style={{ height: '46px' }}>
				{children}
			</div>
			<div className={`${prefixCls}-footer`}>
				{footer || (
					<div className={`${prefixCls}-field`}>
						<span className={`${prefixCls}-field-label`}>{label}</span>
						<CountUp
							className={`${prefixCls}-field-number`}
							prefix={numberPrefix}
							suffix={numberSuffix}
							end={number}
							separator=","
						/>
					</div>
				)}
			</div>
		</Card>
	)
}

export default ChartCard
