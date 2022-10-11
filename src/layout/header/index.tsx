/*
 * @Author: shen
 * @Date: 2022-10-08 09:03:57
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 21:10:09
 * @Description:
 */

import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import { Space } from 'antd'
import { useAppSelector } from '@/store'
import classnames from 'classnames'
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

const { Header } = Layout

const LayoutHeader: FC = () => {
	const prefixCls = usePrefixCls('layout-header')
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const navigationMode = useAppSelector(state => state.app.navigationMode)

	const headerCls = classnames(prefixCls, `${prefixCls}-${navigationMode}`, {
		[`${prefixCls}-light`]:
			(pageStyle === 'light' && navigationMode !== 'mix') || (pageStyle === 'dark' && navigationMode === 'side'),
		[`${prefixCls}-dark`]:
			(pageStyle === 'light' && navigationMode === 'mix') || (pageStyle === 'dark' && navigationMode !== 'side')
	})

	return (
		<Header className={headerCls}>
			{navigationMode !== 'side' && (
				<div className={`${prefixCls}-logo`}>
					<Logo />
				</div>
			)}

			{navigationMode === 'top' ? (
				<div className={`${prefixCls}-menu`} style={{ flex: '1 1 0%' }}>
					<LayoutMenu />
				</div>
			) : (
				<div style={{ flex: '1 1 0%' }}>
					<MenuTrigger />
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
	)
}

export default LayoutHeader
