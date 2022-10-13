/*
 * @Author: shen
 * @Date: 2022-10-08 09:19:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 21:44:34
 * @Description:
 */
import { useMemo } from 'react'
import { Layout } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import LayoutMenu from '../menu'
import Logo from '../logo'
import classnames from 'classnames'

import type { FC } from 'react'

const { Sider } = Layout

const LayoutSider: FC = () => {
	const prefixCls = usePrefixCls('layout-sider')
	const { pageStyle, layout, siderCollapsed: collapsed, fixSiderbar, siderWidth, headerHeight } = useAppSetting()

	const theme = useMemo(() => {
		if (!pageStyle || pageStyle === 'realDark') {
			return 'light'
		} else {
			return pageStyle
		}
	}, [pageStyle])

	const siderCls = classnames(prefixCls, `${prefixCls}-${theme}`, {
		[`${prefixCls}-collapsed`]: collapsed,
		[`${prefixCls}-fixed`]: fixSiderbar,
		[`${prefixCls}-layout-${layout}`]: layout
	})

	return (
		<>
			{fixSiderbar && (
				<div
					style={{
						width: collapsed ? 48 : siderWidth,
						overflow: 'hidden',
						flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
						maxWidth: collapsed ? 48 : siderWidth,
						minWidth: collapsed ? 48 : siderWidth,
						transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`
					}}
				/>
			)}
			<Sider
				theme={theme}
				trigger={null}
				collapsible
				collapsed={collapsed}
				className={siderCls}
				width={siderWidth}
				collapsedWidth={48}
				breakpoint="lg"
				style={{
					overflow: 'hidden',
					paddingTop: layout === 'mix' ? headerHeight : undefined
				}}
			>
				{layout === 'side' && (
					<div className={`${prefixCls}-logo`}>
						<Logo showTitle={!collapsed} />
					</div>
				)}
				<div style={{ flex: '1 1 0%', overflow: 'hidden auto' }}>
					<LayoutMenu className={`${prefixCls}-menu`} />
				</div>
				<div className={`${prefixCls}-resize-handle`}>
					<div className={`${prefixCls}-resize-handle-line`}></div>
				</div>
			</Sider>
		</>
	)
}

export default LayoutSider
