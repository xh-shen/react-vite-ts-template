/*
 * @Author: shen
 * @Date: 2022-10-24 21:27:41
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:21:46
 * @Description:
 */
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setPrimaryMenuKey, useAppDispatch, useAppSelector } from '@/store'
import { Menu } from 'antd'
import { SvgIcon } from '@/components'

import type { FC } from 'react'
import type { MenuProps } from 'antd'
import type { MenuData } from '@/interfaces'

const findSelectedKey = (flatMenus: MenuData[], pathname: string) => {
	let current = flatMenus.find(menu => menu.path === pathname)
	if (current && current.pid === '0') {
		return pathname
	}
	while (current) {
		if (current.pid !== '0') {
			current = flatMenus.find(item => item.id === current?.pid)
		} else {
			return current.path
		}
	}
	return ''
}

const findRouterPath = (flatMenus: MenuData[], key: string) => {
	let current = flatMenus.find(menu => menu.path === key)
	while (current) {
		let children = flatMenus.filter(menu => menu.pid === current?.id)
		if (children.length > 0) {
			current = children[0]
		} else {
			return current.path
		}
	}
	return ''
}

const PrimaryMenu: FC = () => {
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const primaryMenuKey = useAppSelector(state => state.app.primaryMenuKey)
	const flatMenus = useAppSelector(state => state.permission.flatMenus)

	const menuList = useMemo<MenuProps['items']>(
		() =>
			flatMenus
				.filter(menu => menu.pid === '0')
				.map(menu => ({
					label: menu.title,
					key: menu.path,
					icon: <SvgIcon name={menu.icon || 'smile-line'} />
				})),
		[flatMenus]
	)

	const onClick: MenuProps['onClick'] = e => {
		if (e.key === primaryMenuKey) {
			return
		}
		const path = findRouterPath(flatMenus, e.key)
		dispatch(setPrimaryMenuKey(e.key))
		navigate(path)
	}

	useEffect(() => {
		const selectedKey = findSelectedKey(flatMenus, pathname)
		dispatch(setPrimaryMenuKey(selectedKey))
	}, [flatMenus, pathname])

	return <Menu items={menuList} mode="horizontal" theme="dark" selectedKeys={[primaryMenuKey]} onClick={onClick} />
}

export default PrimaryMenu
