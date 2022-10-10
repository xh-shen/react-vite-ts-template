/*
 * @Author: shen
 * @Date: 2022-10-08 09:19:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 15:22:01
 * @Description:
 */
import { useMemo } from 'react'
import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import { useAppSelector } from '@/store'
import LayoutMenu from '../menu'
import Logo from '../logo'

import type { FC } from 'react'
import classnames from 'classnames'

const { Sider } = Layout

const LayoutSider: FC = () => {
	const prefixCls = usePrefixCls('layout-sider')
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const navigationMode = useAppSelector(state => state.app.navigationMode)

	const theme = useMemo(() => {
		if (!pageStyle || pageStyle === 'realDark') {
			return 'light'
		} else {
			return pageStyle
		}
	}, [pageStyle])

	const siderCls = classnames(prefixCls, `${prefixCls}-${theme}`)

	return (
		<Sider theme={theme} className={siderCls} width={208}>
			{navigationMode === 'side' && (
				<div className={`${prefixCls}-logo`}>
					<Logo />
				</div>
			)}
			<div style={{ flex: '1 1 0%', overflow: 'hidden auto' }}>
				<LayoutMenu className={`${prefixCls}-menu`} />
			</div>
		</Sider>
	)
}

export default LayoutSider
