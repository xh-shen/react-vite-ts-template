/*
 * @Author: shen
 * @Date: 2022-10-09 12:40:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-11 17:54:50
 * @Description:
 */
import { AppState, useAppSelector } from '@/store'
import { Menu } from 'antd'
import { useMemo, useState } from 'react'
import { SvgIcon } from '@/components'
import { useLocation, useNavigate } from 'react-router-dom'

import type { MenuProps } from 'antd'
import type { FC } from 'react'
import type { MenuData } from '@/interfaces'
const getOpenKeysProps = (
	openKeys: Array<string | number> | false,
	{
		layout,
		collapsed
	}: {
		layout: AppState['layout']
		collapsed: AppState['siderCollapsed']
	}
): {
	openKeys?: undefined | string[]
} => {
	let openKeysProps = {}
	if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
		openKeysProps = {
			openKeys
		}
	}
	return openKeysProps
}

const getNavMenuItems = (flatMenus: MenuData[], parentId: string = '0'): MenuProps['items'] => {
	const items: MenuProps['items'] = []
	for (let i = 0; i < flatMenus.length; i++) {
		let item = flatMenus[i]
		if (item.pid == parentId) {
			const children = getNavMenuItems(flatMenus, item.id) || []
			items.push({
				label: item.title,
				key: item.path,
				icon: parentId === '0' ? <SvgIcon name={item.icon} /> : null,
				children: children.length > 0 ? children : undefined
			})
		}
	}
	return items
}

console.log(getOpenKeysProps)

const getMatchMenu = (pathname: string, flatmMenus: MenuData[]): MenuData[] => {
	console.log(pathname, flatmMenus)
	return []
}

let rootSubmenuKeys: string[] = []

const LayoutMenu: FC<{ className?: string }> = ({ className }) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const layout = useAppSelector(state => state.app.layout)
	const flatmMenus = useAppSelector(state => state.permission.flatmMenus)
	const flatmMenuKeys = useAppSelector(state => state.permission.flatmMenuKeys)
	const [openKeys, setOpenKeys] = useState<string[]>(['sub1'])
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
	console.log(flatmMenuKeys)
	const theme = useMemo(() => {
		if (!pageStyle || pageStyle === 'realDark') {
			return 'light'
		} else {
			return pageStyle
		}
	}, [pageStyle])

	const mode = useMemo(() => {
		if (!layout || layout === 'side' || layout === 'mix') {
			return 'inline'
		} else {
			return 'horizontal'
		}
	}, [layout])

	const matchMenus = useMemo(() => {
		return getMatchMenu(pathname || '/', flatmMenus || [])
	}, [pathname, flatmMenus])

	const matchMenuKeys = useMemo(() => Array.from(new Set(matchMenus.map(item => item.path || ''))), [matchMenus])

	console.log(matchMenuKeys)

	const menuList = useMemo<MenuProps['items']>(() => {
		const items = getNavMenuItems(flatmMenus) || []
		rootSubmenuKeys = items.filter(item => item).map(item => item?.key) as string[]
		return items
	}, [flatmMenus])

	const onClick: MenuProps['onClick'] = e => {
		if (e.key === pathname) {
			return
		}
		setSelectedKeys([e.key])
		navigate(e.key)
	}

	const onOpenChange: MenuProps['onOpenChange'] = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys)
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
		}
	}

	return (
		<Menu
			className={className}
			theme={theme}
			onClick={onClick}
			openKeys={openKeys}
			onOpenChange={onOpenChange}
			selectedKeys={selectedKeys}
			mode={mode}
			items={menuList}
		/>
	)
}

export default LayoutMenu
