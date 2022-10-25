/*
 * @Author: shen
 * @Date: 2022-10-09 12:40:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 09:08:46
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

let currentRootId = '0'

const getNavMenuItems = (flatMenus: MenuData[], parentId: string = '0'): MenuProps['items'] => {
	const items: MenuProps['items'] = []
	for (let i = 0; i < flatMenus.length; i++) {
		let item = flatMenus[i]
		if (item.pid == parentId) {
			const children = getNavMenuItems(flatMenus, item.id) || []
			items.push({
				label: item.title,
				key: item.path,
				icon: parentId === currentRootId ? <SvgIcon name={item.icon || 'smile-line'} /> : null,
				children: children.length > 0 ? children : undefined
			})
		}
	}
	return items
}

const getSplitMenuItems = (flatMenus: MenuData[], parentId: string) => {
	return getNavMenuItems(flatMenus, parentId)
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
let isMenuTrigger = false
const LayoutMenu: FC<{ className?: string }> = ({ className }) => {
	const navigate = useNavigate()
	const openKeysCache = useRef<string[]>([])
	const { pathname } = useLocation()
	const { pageStyle, layout, siderCollapsed: collapsed, accordionMenu, splitMenus } = useAppSetting()
	const flatMenus = useAppSelector(state => state.permission.flatMenus)
	const matchMenus = useAppSelector(state => state.permission.matchMenus)
	const primaryMenuKey = useAppSelector(state => state.app.primaryMenuKey)
	const [openKeys, setOpenKeys] = useState<string[]>([])
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
	const dispatch = useAppDispatch()
	const theme = useMemo(() => {
		if (pageStyle === 'layoutDark' || pageStyle === 'dark') {
			return 'dark'
		} else {
			return 'light'
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
			openKeysCache.current = matchMenuKeys
			setOpenKeys(matchMenuKeys)
		}
		if (!isMenuTrigger && !!openKeysCache.current.length) {
			if (accordionMenu) {
				openKeysCache.current = matchMenuKeys
			} else {
				openKeysCache.current = Array.from(new Set([...openKeysCache.current, ...matchMenuKeys]))
			}
			setOpenKeys(openKeysCache.current)
		}
	}, [matchMenuKeys.join('-')])

	useEffect(() => {
		if (!!openKeysCache.current.length && !collapsed) {
			setOpenKeys(openKeysCache.current)
		}
	}, [collapsed])

	useEffect(() => {
		setSelectedKeys([pathname])
	}, [pathname, splitMenus])

	useEffect(() => {
		if (accordionMenu && !collapsed && matchMenuKeys) {
			openKeysCache.current = matchMenuKeys
			setOpenKeys(openKeysCache.current)
		}
	}, [accordionMenu])

	const openKeysProps = useMemo(
		() => getOpenKeysProps(openKeys, { layout, collapsed }),
		[openKeys && openKeys.join(','), layout, collapsed]
	)

	const menuList = useMemo<MenuProps['items']>(() => {
		let items: MenuProps['items'] = []
		if (!!primaryMenuKey && splitMenus) {
			const root = flatMenus.find(menu => menu.path === primaryMenuKey)
			currentRootId = root!.id
			items = getSplitMenuItems(flatMenus, root!.id)
		} else {
			currentRootId = '0'
			items = getNavMenuItems(flatMenus)
		}
		rootSubmenuKeys = items!.filter(item => item).map(item => item?.key) as string[]
		return items
	}, [flatMenus, primaryMenuKey, splitMenus])

	const onClick: MenuProps['onClick'] = e => {
		if (e.key === pathname) {
			return
		}
		isMenuTrigger = true
		navigate(e.key)
		setTimeout(() => (isMenuTrigger = false))
	}

	const onOpenChange: MenuProps['onOpenChange'] = keys => {
		let newOpenKeus: string[] = []
		if (!accordionMenu) {
			newOpenKeus = keys
		} else {
			const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
			if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
				newOpenKeus = keys
			} else {
				newOpenKeus = latestOpenKey ? [latestOpenKey] : []
			}
		}
		if (!collapsed) {
			openKeysCache.current = newOpenKeus
		}
		setOpenKeys(newOpenKeus)
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
