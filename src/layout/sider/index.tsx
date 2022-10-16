/*
 * @Author: shen
 * @Date: 2022-10-08 09:19:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 08:12:06
 * @Description:
 */
import { useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import LayoutMenu from '../menu'
import Logo from '../logo'
import classnames from 'classnames'

import type { FC } from 'react'
import { DragHandle, SvgIcon } from '@/components'
import { useAppDispatch, setSiderCollapsed } from '@/store'

const { Sider } = Layout

export const collapsedButtonRender = (collapsed?: boolean) => <SvgIcon name={collapsed ? 'menu-unfold-line' : 'menu-fold-line'} />

const LayoutSider: FC = () => {
	const prefixCls = usePrefixCls('layout-sider')
	const dispatch = useAppDispatch()
	const {
		pageStyle,
		layout,
		siderCollapsed: collapsed,
		fixSiderbar,
		siderWidth,
		headerHeight,
		dragSidebar,
		collapsePosition,
		showLogo,
		showHeader,
		showCollapseButton,
		setSettingValue
	} = useAppSetting()

	const theme = useMemo(() => {
		if (pageStyle === 'layoutDark' || pageStyle === 'dark') {
			return 'dark'
		} else {
			return 'light'
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
					// overflow: 'hidden',
					paddingTop: layout === 'mix' && showHeader ? headerHeight : undefined
				}}
			>
				{layout === 'side' && showLogo && (
					<div className={`${prefixCls}-logo`}>
						<Logo showTitle={!collapsed} />
					</div>
				)}
				<div style={{ flex: '1 1 0%', overflowY: 'auto' }}>
					<LayoutMenu className={`${prefixCls}-menu`} />
				</div>
				{showCollapseButton && collapsePosition === 'bottom' && (
					<div className={`${prefixCls}-links`}>
						<Menu
							theme={theme}
							inlineIndent={16}
							className={`${prefixCls}-link-menu`}
							selectedKeys={[]}
							openKeys={[]}
							mode="inline"
							items={[
								{
									className: `${prefixCls}-collapsed-button`,
									key: 'collapsed',
									//@ts-ignore
									title: false,
									onClick: () => dispatch(setSiderCollapsed(!collapsed)),
									label: collapsedButtonRender(collapsed)
								}
							]}
						/>
					</div>
				)}
				{dragSidebar && !collapsed && (
					<DragHandle width={siderWidth} minWidth={120} maxWidth={500} onStop={value => setSettingValue('siderWidth', value)} />
				)}
			</Sider>
		</>
	)
}

export default LayoutSider
