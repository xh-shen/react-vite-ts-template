/*
 * @Author: shen
 * @Date: 2022-10-09 12:40:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-15 21:44:21
 * @Description:
 */
import { AppState, useAppDispatch, useAppSelector, setMatchMenus } from '@/store'
import { Menu } from 'antd'
import { useMemo, useState, useEffect, useRef } from 'react'
import { SvgIcon } from '@/components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSetting } from '@/hooks'

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

const getMatchMenu = (pathname: string, flatMenus: MenuData[]): MenuData[] => {
	const matchMenus: MenuData[] = []
	let current = flatMenus.find(item => item.path === pathname)
	while (current) {
		matchMenus.unshift(current)
		if (current.pid !== '0') {
			current = flatMenus.find(item => item.id === current?.pid)
		} else {
			current = undefined
		}
	}
	return matchMenus
}

let rootSubmenuKeys: string[] = []

const LayoutMenu: FC<{ className?: string }> = ({ className }) => {
	const navigate = useNavigate()
	const openKeysCache = useRef<string[]>([])
	const { pathname } = useLocation()
	const { pageStyle, layout, siderCollapsed: collapsed, accordionMenu } = useAppSetting()
	const flatMenus = useAppSelector(state => state.permission.flatMenus)
	const matchMenus = useAppSelector(state => state.permission.matchMenus)
	const [openKeys, setOpenKeys] = useState<string[]>([])
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
	const dispatch = useAppDispatch()
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

	useEffect(() => {
		const menus = getMatchMenu(pathname || '/', flatMenus || [])
		dispatch(setMatchMenus(menus))
	}, [pathname, flatMenus])

	const matchMenuKeys = useMemo(() => {
		const matchKeys = Array.from(new Set(matchMenus.map(item => item.path || '')))
		matchKeys.pop()
		return matchKeys
	}, [matchMenus])

	useEffect(() => {
		if (matchMenuKeys && !openKeysCache.current.length) {
			setOpenKeys(matchMenuKeys)
		}
	}, [matchMenuKeys.join('-')])

	useEffect(() => {
		if (!!openKeysCache.current.length && !collapsed) {
			setOpenKeys(openKeysCache.current)
		}
	}, [collapsed])

	useEffect(() => {
		if (accordionMenu && !collapsed && matchMenuKeys) {
			setOpenKeys(matchMenuKeys)
		}
	}, [accordionMenu])

	const openKeysProps = useMemo(
		() => getOpenKeysProps(openKeys, { layout, collapsed }),
		[openKeys && openKeys.join(','), layout, collapsed]
	)

	const menuList = useMemo<MenuProps['items']>(() => {
		const items = getNavMenuItems(flatMenus) || []
		rootSubmenuKeys = items.filter(item => item).map(item => item?.key) as string[]
		return items
	}, [flatMenus])

	const onClick: MenuProps['onClick'] = e => {
		if (e.key === pathname) {
			return
		}
		setSelectedKeys([e.key])
		navigate(e.key)
	}

	const onOpenChange: MenuProps['onOpenChange'] = keys => {
		if (!accordionMenu) {
			openKeysCache.current = keys
		} else {
			const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
			if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
				openKeysCache.current = keys
			} else {
				openKeysCache.current = latestOpenKey ? [latestOpenKey] : []
			}
		}
		setOpenKeys(openKeysCache.current)
	}

	return (
		<Menu
			{...openKeysProps}
			className={className}
			theme={theme}
			onClick={onClick}
			onOpenChange={onOpenChange}
			selectedKeys={selectedKeys}
			mode={mode}
			items={menuList}
		/>
	)
}

export default LayoutMenu
