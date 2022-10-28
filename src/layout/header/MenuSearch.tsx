/*
 * @Author: shen
 * @Date: 2022-10-09 12:32:54
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 16:26:22
 * @Description:
 */
import { useMemo, useState } from 'react'
import { usePrefixCls } from '@/hooks'
import { SvgIcon, Search } from '@/components'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { unionBy } from 'lodash-es'

import type { FC } from 'react'
import type { MenuData } from '@/interfaces'
import { getFullChars } from '@/utils'

const getLastLevelMenus = (flatMenus: MenuData[], parentMenu: MenuData) => {
	const menus: MenuData[] = []
	const deepChild = (flatMenus, parentMenu) => {
		const children = flatMenus.filter(menu => menu.pid === parentMenu.id)
		if (children.length > 0) {
			children.forEach(child => {
				deepChild(flatMenus, child)
			})
		} else {
			menus.push(parentMenu)
		}
	}
	deepChild(flatMenus, parentMenu)
	return menus
}

const getMatchMenus = (pathname: string, flatMenus: MenuData[]): MenuData[] => {
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

const MenuSearch: FC = () => {
	const navigate = useNavigate()
	const prefixCls = usePrefixCls('layout-action')
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const [open, setOpen] = useState(false)
	const [dataSource, setDataSource] = useState<any[]>([])
	const flatMenus = useAppSelector(state => state.permission.flatMenus)

	const onClose = () => {
		setOpen(false)
		setDataSource([])
	}

	const pinYinFlatMenus = useMemo(() => flatMenus.map(item => ({ ...item, chars: getFullChars(item.title) })), [flatMenus])

	const onDebounceChange = (value?: string) => {
		if (!value?.trim()) {
			setDataSource([])
			return
		}
		const lastLevelMenus: MenuData[] = []
		const filter = pinYinFlatMenus.filter(
			menu => menu.title.toLowerCase().indexOf(value.toLowerCase()) > -1 || menu.chars.indexOf(value.toLowerCase()) > -1
		)
		filter.forEach(item => {
			lastLevelMenus.push(...getLastLevelMenus(flatMenus, item))
		})
		const result = unionBy(lastLevelMenus, 'path').map(item => {
			const matchMenus = getMatchMenus(item.path, flatMenus)
			return {
				value: item.path,
				title: matchMenus.map(menu => menu.title).join('/')
			}
		})
		setDataSource(result)
	}

	const onSelect = key => {
		setDataSource([])
		if (pathname === key) {
			return
		}
		navigate(key)
	}

	return (
		<>
			<span className={`${prefixCls} ${prefixCls}-search`} onClick={() => setOpen(true)}>
				<SvgIcon name="search-line" />
			</span>
			<Search
				open={open}
				destroyOnClose
				dataSource={dataSource}
				placeholder={t('header.menuSearch')}
				onClose={onClose}
				onSelect={onSelect}
				onDebounceChange={onDebounceChange}
			/>
		</>
	)
}

export default MenuSearch
