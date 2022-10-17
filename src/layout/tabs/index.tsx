/*
 * @Author: shen
 * @Date: 2022-10-16 15:04:32
 * @LastEditors: shen
 * @LastEditTime: 2022-10-17 16:58:15
 * @Description:
 */
import { Tag, Dropdown, Menu } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import { FC, useEffect, WheelEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { genDashboardMenu } from '@/utils'
import {
	addTabsItem,
	delTabsItem,
	delTabsLeftItems,
	delTabsRightItems,
	delTabsOtherItems,
	delTabsAllItems,
	setVisitedList,
	useAppDispatch,
	useAppSelector,
	setTabsLang
} from '@/store'
import { DASHBOARD_PATH } from '@/router/constant'
import { SvgIcon } from '@/components'
import { MenuOutlined } from '@ant-design/icons'

const LayoutTabs: FC = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { themeColor, tabsHeight, fullContent, setSettingValue } = useAppSetting()
	const prefixCls = usePrefixCls('layout-tabs')
	const dashboardMenu = genDashboardMenu()
	const lang = useAppSelector(state => state.app.lang)
	const tabsLang = useAppSelector(state => state.tabs.tabsLang)
	const flatMenus = useAppSelector(state => state.permission.flatMenus)
	const visitedList = useAppSelector(state => state.tabs.visitedList)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleClose = key => {
		const index = visitedList.findIndex(item => item.path === key)
		if (key === pathname) {
			if (index === 0) {
				navigate(dashboardMenu.path)
			} else {
				navigate(visitedList[index - 1].path)
			}
		}
		dispatch(delTabsItem(key))
	}

	const handleCloseLeft = () => {
		dispatch(delTabsLeftItems(pathname))
	}
	const handleCloseRight = () => {
		dispatch(delTabsRightItems(pathname))
	}
	const handleCloseOther = () => {
		dispatch(delTabsOtherItems(pathname))
	}
	const handleCloseAll = () => {
		navigate(dashboardMenu.path)
		dispatch(delTabsAllItems())
	}

	const onMoveOffset = (offsetX): boolean => {
		console.log(offsetX)
		return true
	}

	const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
		const { deltaX, deltaY } = e

		let mixed: number = 0
		const absX = Math.abs(deltaX)
		const absY = Math.abs(deltaY)
		if (absX >= absY) {
			mixed = absX
		}
		onMoveOffset(-mixed)
	}

	const renderTag = item => {
		return (
			<Tag
				className={`${prefixCls}-tag ${item.path === pathname ? 'active' : ''}`}
				key={item.path}
				closable={item.path !== DASHBOARD_PATH}
				color={item.path === pathname ? themeColor : undefined}
				onClick={() => navigate(item.path)}
				onClose={() => handleClose(item.path)}
			>
				{item.title}
			</Tag>
		)
	}

	const menu = (
		<Menu
			items={[
				{
					key: 'current',
					disabled: pathname === DASHBOARD_PATH || !visitedList.length,
					label: <span>{t('tabs.closeCurrent')}</span>,
					onClick: () => handleClose(pathname)
				},
				{
					type: 'divider'
				},
				{
					key: 'left',
					disabled: pathname === DASHBOARD_PATH || !visitedList.length || pathname === visitedList[0].path,
					label: <span>{t('tabs.closeLeft')}</span>,
					onClick: handleCloseLeft
				},
				{
					key: 'right',
					disabled: !visitedList.length || pathname === visitedList[visitedList.length - 1].path,
					label: <span>{t('tabs.closeRight')}</span>,
					onClick: handleCloseRight
				},
				{
					type: 'divider'
				},
				{
					key: 'other',
					disabled: !visitedList.length || (pathname !== DASHBOARD_PATH && visitedList.length === 1),
					label: <span>{t('tabs.closeOther')}</span>,
					onClick: handleCloseOther
				},
				{
					key: 'all',
					disabled: !visitedList.length,
					label: <span>{t('tabs.closeAll')}</span>,
					onClick: handleCloseAll
				}
			]}
		/>
	)

	useEffect(() => {
		if (pathname === DASHBOARD_PATH) {
			return
		}
		const tab = visitedList.find(item => item.path === pathname)
		if (!tab) {
			const menu = flatMenus.find(item => item.path === pathname)
			if (menu) {
				dispatch(addTabsItem({ path: menu.path, title: menu.title }))
			}
		}
	}, [pathname])

	useEffect(() => {
		if (tabsLang && tabsLang !== lang && visitedList.length > 0) {
			const newVisitedList = visitedList.map(item => {
				const menu = flatMenus.find(m => m.path === item.path)
				return {
					title: menu?.title ?? 'unknown',
					path: item.path
				}
			})
			dispatch(setVisitedList({ list: newVisitedList, lang }))
		}
		dispatch(setTabsLang(lang))
	}, [])

	return (
		<div className={prefixCls} style={{ height: tabsHeight + 'px' }}>
			<div className={`${prefixCls}-content`} onWheel={handleWheel}>
				<div className={`${prefixCls}-list`}>
					{renderTag(dashboardMenu)}
					{visitedList.map(item => renderTag(item))}
				</div>
			</div>

			<div className={`${prefixCls}-actions`}>
				<Dropdown overlay={menu} placement="bottom" trigger={['click']}>
					<MenuOutlined />
				</Dropdown>
				<span onClick={() => setSettingValue('fullContent', !fullContent, false)}>
					<SvgIcon name={fullContent ? 'exit-full-line' : 'full-line'} />
				</span>
			</div>
		</div>
	)
}

export default LayoutTabs
