/*
 * @Author: shen
 * @Date: 2022-10-26 09:04:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 21:57:16
 * @Description:
 */
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLocker } from '@/hooks'
import { canUseDom } from '@/utils'
import OrderContext from './Context'
import useDom from './useDom'

import type { ReactNode } from 'react'

export type ContainerType = Element | DocumentFragment

export type GetContainer = string | ContainerType | (() => ContainerType) | false

export interface PortalProps {
	getContainer?: GetContainer
	children?: ReactNode
	open?: boolean
	autoDestroy?: boolean
	autoLock?: boolean
	debug?: string
}

const getPortalContainer = (getContainer?: GetContainer) => {
	if (getContainer === false) {
		return false
	}

	if (!canUseDom() || !getContainer) {
		return null
	}

	if (typeof getContainer === 'string') {
		return document.querySelector(getContainer)
	}
	if (typeof getContainer === 'function') {
		return getContainer()
	}
	return getContainer
}

export default function Portal(props: PortalProps) {
	const { open, getContainer, debug, autoDestroy = true, children, autoLock } = props
	const [mergedRender, setMergedRender] = useState(open)
	useEffect(() => {
		if (autoDestroy || open) {
			setMergedRender(open)
		}
	}, [open, autoDestroy])

	const [innerContainer, setInnerContainer] = useState<ContainerType | false | null>(() => getPortalContainer(getContainer))

	useEffect(() => {
		const customizeContainer = getPortalContainer(getContainer)

		setInnerContainer(customizeContainer ?? null)
	})

	const [defaultContainer, queueCreate] = useDom(mergedRender && !innerContainer, debug)
	const mergedContainer = innerContainer ?? defaultContainer

	useScrollLocker(autoLock && open && canUseDom() && (mergedContainer === defaultContainer || mergedContainer === document.body))

	if (!mergedRender || !canUseDom() || innerContainer === undefined) {
		return null
	}

	// Render inline
	const renderInline = mergedContainer === false

	return (
		<OrderContext.Provider value={queueCreate}>
			{renderInline ? children : createPortal(children, mergedContainer)}
		</OrderContext.Provider>
	)
}
