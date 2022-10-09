/*
 * @Author: shen
 * @Date: 2022-10-09 14:26:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 15:17:59
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { FC, ReactNode } from 'react'

interface SettingBlockProps {
	title: string
	children?: ReactNode
}

const SettingBlock: FC<SettingBlockProps> = ({ title, children }) => {
	const prefixCls = usePrefixCls('layout-setting')

	return (
		<div className={`${prefixCls}-block`}>
			<div className={`${prefixCls}-block-title`}>{title}</div>
			{children}
		</div>
	)
}

export default SettingBlock
