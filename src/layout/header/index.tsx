/*
 * @Author: shen
 * @Date: 2022-10-08 09:03:57
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 15:47:37
 * @Description:
 */
import { useMemo } from 'react'
import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import { Space } from 'antd'
import { useAppSelector } from '@/store'
import classNames from 'classnames'
import Logo from '../logo'
import Language from './Language'
import User from './User'
import Notice from './Notice'
import Search from './Search'
import Question from './Question'
import Fullscreen from './Fullscreen'
import LayoutMenu from '../menu'

import type { FC } from 'react'
import MenuTrigger from './MenuTrigger'
import Breadcrumb from './Breadcrumb'

const { Header } = Layout

const LayoutHeader: FC = () => {
	const prefixCls = usePrefixCls('layout-header')
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const layout = useAppSelector(state => state.app.layout)
	const headerHeight = useAppSelector(state => state.app.headerHeight)
	const fixedHeader = useAppSelector(state => state.app.fixedHeader)
	const siderWidth = useAppSelector(state => state.app.siderWidth)
	const collapsed = useAppSelector(state => state.app.siderCollapsed)

	const needFixedHeader = useMemo(() => fixedHeader || layout === 'mix', [fixedHeader, layout])

	const className = classNames(prefixCls, `${prefixCls}-${layout}`, {
		[`${prefixCls}-fixed`]: needFixedHeader,
		[`${prefixCls}-fixed-action`]: !collapsed,
		[`${prefixCls}-light`]: (pageStyle === 'light' && layout !== 'mix') || (pageStyle === 'dark' && layout === 'side'),
		[`${prefixCls}-dark`]: (pageStyle === 'light' && layout === 'mix') || (pageStyle === 'dark' && layout !== 'side')
	})

	const width = useMemo(() => {
		return layout === 'side' && needFixedHeader ? `calc(100% - ${collapsed ? 48 : siderWidth}px)` : '100%'
	}, [collapsed, siderWidth, layout, needFixedHeader])

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
				{layout !== 'side' && (
					<div className={`${prefixCls}-logo`} style={{ width: siderWidth + 'px' }}>
						<Logo />
					</div>
				)}

				{layout === 'top' ? (
					<div className={`${prefixCls}-menu`} style={{ flex: '1 1 0%' }}>
						<LayoutMenu />
					</div>
				) : (
					<div className={`${prefixCls}-left`} style={{ flex: '1 1 0%' }}>
						<MenuTrigger />
						<Breadcrumb />
					</div>
				)}

				<Space className={`${prefixCls}-right`}>
					<Search />
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
