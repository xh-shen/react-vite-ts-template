/*
 * @Author: shen
 * @Date: 2022-10-18 18:33:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 10:14:02
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import './index.less'

import type { FC, ReactNode, CSSProperties } from 'react'

export interface PageContainerProps {
	className?: string
	style?: CSSProperties
	children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
	const prefixCls = usePrefixCls('page-container')
	return <div className={`${prefixCls} ${className}`}>{children}</div>
}

export default PageContainer
