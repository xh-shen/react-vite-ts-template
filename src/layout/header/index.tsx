/*
 * @Author: shen
 * @Date: 2022-10-08 09:03:57
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 12:44:05
 * @Description:
 */

import { Layout } from 'antd'
import { usePrefixCls } from '@/hooks'
import { Space } from 'antd'
import Logo from '../logo'
import Language from './Language'
import User from './User'
import Notice from './Notice'
import Search from './Search'
import Question from './Question'

import type { FC } from 'react'
import LayoutMenu from '../menu'

const { Header } = Layout

const LayoutHeader: FC = () => {
	const prefixCls = usePrefixCls('layout-header')
	return (
		<Header className={`${prefixCls} ${prefixCls}-light`}>
			<div className={`${prefixCls}-left`}>
				<Logo />
			</div>
			<div className={`${prefixCls}-menu`} style={{ flex: '1 1 0%' }}>
				<LayoutMenu />
			</div>
			<Space className={`${prefixCls}-right`}>
				<Search />
				<Question />
				<Notice />
				<User />
				<Language />
			</Space>
		</Header>
	)
}

export default LayoutHeader
