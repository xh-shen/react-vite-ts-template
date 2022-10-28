/*
 * @Author: shen
 * @Date: 2022-10-08 09:03:57
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:39:47
 * @Description:
 */
import { useMemo } from 'react'
import { Layout } from 'antd'
import { usePrefixCls, useAppSetting } from '@/hooks'
import { Space } from 'antd'
import classNames from 'classnames'
import Logo from '../logo'
import Language from './Language'
import User from './User'
import Notice from './Notice'
import MenuSearch from './MenuSearch'
import Question from './Question'
import Fullscreen from './Fullscreen'
import LayoutMenu from '../menu'
import MenuTrigger from './MenuTrigger'
import Breadcrumb from './Breadcrumb'
import PrimaryMenu from './PrimaryMenu'

import type { FC } from 'react'

const { Header } = Layout

const LayoutHeader: FC = () => {
	const prefixCls = usePrefixCls('layout-header')
	const {
		pageStyle,
		layout,
		darkMode,
		siderCollapsed: collapsed,
		fixedHeader,
		siderWidth,
		headerHeight,
		splitMenus,
		showSiderbar,
		showLogo,
		showBreadcrumbs,
		showCollapseButton,
		collapsePosition
	} = useAppSetting()

	const needFixedHeader = useMemo(() => fixedHeader || layout === 'mix', [fixedHeader, layout])

	const headerTheme = useMemo(() => {
		if (
			darkMode ||
			(pageStyle === 'light' && layout !== 'mix') ||
			// (layout === 'mix' && pageStyle === 'dark') ||
			(layout === 'side' && pageStyle === 'dark')
		) {
			return 'light'
		}
		return 'dark'
	}, [layout, pageStyle])

	const className = classNames(prefixCls, `${prefixCls}-${layout}`, {
		[`${prefixCls}-fixed`]: needFixedHeader,
		[`${prefixCls}-fixed-action`]: !collapsed,
		[`${prefixCls}-${headerTheme}`]: true
	})

	const width = useMemo(() => {
		return layout === 'side' && needFixedHeader && showSiderbar ? `calc(100% - ${collapsed ? 48 : siderWidth}px)` : '100%'
	}, [collapsed, siderWidth, layout, needFixedHeader, showSiderbar])

	const renderLeftOrMenus = () => {
		if (layout === 'top') {
			return (
				<div className={`${prefixCls}-menu`} style={{ flex: '1 1 0%' }}>
					<LayoutMenu />
				</div>
			)
		} else if (layout === 'mix' && splitMenus) {
			return (
				<div className={`${prefixCls}-menu`} style={{ flex: '1 1 0%' }}>
					<PrimaryMenu />
				</div>
			)
		} else {
			return (
				<div className={`${prefixCls}-left`} style={{ flex: '1 1 0%' }}>
					{showCollapseButton && collapsePosition === 'top' && <MenuTrigger />}
					{showBreadcrumbs && <Breadcrumb />}
				</div>
			)
		}
	}

	return (
		<>
			{needFixedHeader && (
				<Header
					style={{
						height: headerHeight,
						lineHeight: `${headerHeight}px`,
						background: 'transparent'
					}}
				/>
			)}
			<Header
				className={className}
				style={{
					padding: 0,
					height: headerHeight,
					lineHeight: `${headerHeight}px`,
					zIndex: layout === 'mix' ? 101 : 19,
					width,
					right: needFixedHeader ? 0 : undefined
				}}
			>
				{layout !== 'side' && showLogo && (
					<div className={`${prefixCls}-logo`} style={{ width: siderWidth + 'px' }}>
						<Logo />
					</div>
				)}
				{renderLeftOrMenus()}
				<Space className={`${prefixCls}-right`}>
					<MenuSearch />
					<Question />
					<Fullscreen />
					<Notice />
					<User />
					<Language />
				</Space>
			</Header>
		</>
	)
}

export default LayoutHeader
