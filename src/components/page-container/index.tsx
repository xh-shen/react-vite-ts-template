/*
 * @Author: shen
 * @Date: 2022-10-18 18:33:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-18 18:39:05
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import './index.less'

import type { FC, ReactNode } from 'react'

export interface PageContainerProps {
	children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
	const prefixCls = usePrefixCls('page-container')
	return <div className={prefixCls}>{children}</div>
}

export default PageContainer
