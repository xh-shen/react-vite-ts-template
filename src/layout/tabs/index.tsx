/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: shen
 * @Date: 2022-10-16 15:04:32
 * @LastEditors: shen
 * @LastEditTime: 2022-10-19 09:10:14
 * @Description:
 */
import { Tag, Dropdown, Menu } from 'antd'
import { useAppSetting, usePrefixCls, useRaf, useRafState, useSyncState } from '@/hooks'
import { FC, useEffect, WheelEvent, useRef, useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { genDashboardMenu, on, off, stringify } from '@/utils'
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
import { MenuOutlined, EllipsisOutlined } from '@ant-design/icons'
import ResizeObserver from 'rc-resize-observer'
import useRefs from './useRefs'
import useOffsets, { TabSizeMap } from './useOffsets'
import useVisibleRange from './useVisibleRange'
import classNames from 'classnames'

const getWidth = (refObj: React.RefObject<HTMLElement>): number => {
	const { offsetWidth = 0 } = refObj.current || {}
	return offsetWidth
}

const LayoutTabs: FC = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const containerRef = useRef<HTMLDivElement>(null)
	const tabsWrapperRef = useRef<HTMLDivElement>(null)
	const tabListRef = useRef<HTMLDivElement>(null)
	const operationsRef = useRef<HTMLDivElement>(null)
	const [getBtnRef, removeBtnRef] = useRefs<HTMLDivElement>()
	const whelEventsRef = useRef<(e: WheelEvent) => void>()
	const {
		themeColor,
		tabsHeight,
		headerHeight,
		fullContent,
		siderCollapsed,
		siderWidth,
		showSiderbar,
		fixedHeader,
		layout,
		setSettingValue
	} = useAppSetting()
	const [transformLeft, setTransformLeft] = useSyncState(0, (next, prev) => {
		// console.log(next, prev)
	})
	const [containerWidth, setContainerWidth] = useState<number>(0)
	const [tabContentWidth, setTabContentWidth] = useState<number>(0)
	const [operationWidth, setOperationWidth] = useState<number>(0)

	const prefixCls = usePrefixCls('layout-tabs')
	const dashboardMenu = genDashboardMenu()
	const lang = useAppSelector(state => state.app.lang)
	const tabsLang = useAppSelector(state => state.tabs.tabsLang)
	const flatMenus = useAppSelector(state => state.permission.flatMenus)
	const visitedList = useAppSelector(state => state.tabs.visitedList)

	const tabs = useMemo(
		() => [
			{ key: dashboardMenu.path, label: dashboardMenu.title },
			...visitedList.map(item => ({ key: item.path, label: item.title }))
		],
		[visitedList.map(tab => tab.path).join('_')]
	)

	const [tabSizes, setTabSizes] = useRafState<TabSizeMap>(new Map())
	const tabOffsets = useOffsets(tabs, tabSizes, tabContentWidth)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	// ========================== Util =========================
	const needScroll = containerWidth < tabContentWidth
	const visibleTabContentValue = needScroll ? containerWidth - operationWidth : containerWidth

	let transformMin = Math.min(0, visibleTabContentValue - tabContentWidth)
	let transformMax = 0

	function alignInRange(value: number): number {
		if (value < transformMin) {
			return transformMin
		}
		if (value > transformMax) {
			return transformMax
		}
		return value
	}

	const touchMovingRef = useRef<number>()
	const [lockAnimation, setLockAnimation] = useState<number>()

	function doLockAnimation() {
		setLockAnimation(Date.now())
	}

	function clearTouchMoving() {
		window.clearTimeout(touchMovingRef.current)
	}

	const onMoveOffset = (offsetX): boolean => {
		function doMove(setState: React.Dispatch<React.SetStateAction<number>>, offset: number) {
			setState(value => {
				const newValue = alignInRange(value + offset)
				return newValue
			})
		}
		if (containerWidth >= tabContentWidth) {
			return false
		}
		doMove(setTransformLeft, offsetX)

		clearTouchMoving()
		doLockAnimation()
		return true
	}

	whelEventsRef.current = (e: WheelEvent) => {
		const { deltaX, deltaY } = e
		let mixed: number = 0
		const absX = Math.abs(deltaX)
		const absY = Math.abs(deltaY)
		if (absX >= absY) {
			mixed = deltaX
		}

		if (onMoveOffset(-mixed)) {
			e.preventDefault()
		}
	}

	useEffect(() => {
		clearTouchMoving()
		if (lockAnimation) {
			touchMovingRef.current = window.setTimeout(() => {
				setLockAnimation(0)
			}, 100)
		}

		return clearTouchMoving
	}, [lockAnimation])

	const onListHolderResize = useRaf(() => {
		const containerWidth = getWidth(containerRef)
		setContainerWidth(containerWidth)
		const newOperationWidth = getWidth(operationsRef)
		setOperationWidth(newOperationWidth)
		const tabContentFullWidth = getWidth(tabListRef)
		setTabContentWidth(tabContentFullWidth)
		setTabSizes(() => {
			const newSizes: TabSizeMap = new Map()
			tabs.forEach(({ key }) => {
				const btnNode = getBtnRef(key).current
				if (btnNode) {
					newSizes.set(key, {
						width: btnNode.offsetWidth,
						left: btnNode.offsetLeft
					})
				}
			})
			return newSizes
		})
	})

	const [visibleStart, visibleEnd] = useVisibleRange(
		tabOffsets,
		visibleTabContentValue,
		transformLeft,
		tabContentWidth,
		operationWidth,
		tabs
	)

	// ========================= Scroll ========================
	const scrollToTab = (key = pathname) => {
		const tabOffset = tabOffsets.get(key) || {
			width: 0,
			left: 0,
			right: 0
		}
		let newTransform = transformLeft
		if (tabOffset.left < -transformLeft) {
			newTransform = -tabOffset.left
		} else if (tabOffset.left + tabOffset.width > -transformLeft + visibleTabContentValue) {
			newTransform = -(tabOffset.left + tabOffset.width - visibleTabContentValue)
		}
		setTransformLeft(alignInRange(newTransform))
	}

	// ======================== Dropdown =======================
	const startHiddenTabs = tabs.slice(0, visibleStart)
	const endHiddenTabs = tabs.slice(visibleEnd + 1)
	const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs]

	const operationsClass = classNames(`${prefixCls}-nav-operations`, {
		[`${prefixCls}-nav-operations-hidden`]: !hiddenTabs.length
	})
	// =================close===================
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

	//====================style========================
	const needFixedHeader = useMemo(() => fixedHeader || layout === 'mix', [fixedHeader, layout])
	const width = useMemo(() => {
		return layout !== 'top' && needFixedHeader && showSiderbar ? `calc(100% - ${siderCollapsed ? 48 : siderWidth}px)` : '100%'
	}, [siderCollapsed, siderWidth, layout, needFixedHeader, showSiderbar])

	const className = classNames(prefixCls, {
		[`${prefixCls}-fixed`]: needFixedHeader
	})

	const renderTag = item => {
		return (
			<Tag
				ref={getBtnRef(item.path)}
				className={`${prefixCls}-nav-tag ${item.path === pathname ? 'active' : ''}`}
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

	const updateTabsList = () => {
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
	}

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
		scrollToTab(pathname)
	}, [pathname, stringify(tabOffsets)])

	useEffect(() => {
		updateTabsList()
		function onProxyWheel(e: WheelEvent) {
			whelEventsRef.current?.(e)
		}
		on(tabsWrapperRef.current!, 'wheel', onProxyWheel as any)
		return () => off(tabsWrapperRef.current!, 'wheel', onProxyWheel as any)
	}, [])

	return (
		<>
			{needFixedHeader && (
				<div
					style={{
						height: tabsHeight,
						background: 'transparent'
					}}
				></div>
			)}
			<div
				className={className}
				style={{
					height: tabsHeight,
					width: fullContent ? '100%' : width,
					right: needFixedHeader ? 0 : undefined,
					top: fullContent ? 0 : needFixedHeader ? headerHeight : undefined
				}}
			>
				<ResizeObserver onResize={onListHolderResize}>
					<div className={`${prefixCls}-nav`} ref={containerRef}>
						<div className={`${prefixCls}-nav-wrap`} ref={tabsWrapperRef}>
							<ResizeObserver onResize={onListHolderResize}>
								<div
									className={`${prefixCls}-nav-list`}
									ref={tabListRef}
									style={{
										transform: `translateX(${transformLeft}px)`,
										transition: lockAnimation ? 'none' : undefined
									}}
								>
									{renderTag(dashboardMenu)}
									{visitedList.map(item => renderTag(item))}
								</div>
							</ResizeObserver>
						</div>
						<div className={operationsClass} ref={operationsRef}>
							<Dropdown overlay={<Menu onClick={e => navigate(e.key)} items={hiddenTabs} />} placement="bottomRight">
								<EllipsisOutlined />
							</Dropdown>
						</div>
					</div>
				</ResizeObserver>

				<div className={`${prefixCls}-actions `}>
					<Dropdown overlay={menu} placement="bottom" trigger={['click']}>
						<MenuOutlined />
					</Dropdown>
					<span onClick={() => setSettingValue('fullContent', !fullContent, false)}>
						<SvgIcon name={fullContent ? 'exit-full-line' : 'full-line'} />
					</span>
				</div>
			</div>
		</>
	)
}

export default LayoutTabs
