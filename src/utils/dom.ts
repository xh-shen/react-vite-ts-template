/*
 * @Author: shen
 * @Date: 2022-10-13 20:22:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-20 10:57:10
 * @Description:
 */
import { isObject, isFunction, isBrowser } from './validate'
import { entriesOf, keysOf } from './objects'
import { camelCase } from 'lodash-es'

import type { CSSProperties, MutableRefObject } from 'react'

export const on = function (
	element: HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject,
	useCapture = false
): void {
	if (element && event && handler) {
		element.addEventListener(event, handler, useCapture)
	}
}

export const off = function (
	element: HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject,
	useCapture = false
): void {
	if (element && event && handler) {
		element.removeEventListener(event, handler, useCapture)
	}
}
export const classNameToArray = (cls = '') => cls.split(' ').filter(item => !!item.trim())

export const hasClass = (el: Element, cls: string): boolean => {
	if (!el || !cls) return false
	if (cls.includes(' ')) throw new Error('className should not contain space.')
	return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
	if (!el || !cls.trim()) return
	el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
	if (!el || !cls.trim()) return
	el.classList.remove(...classNameToArray(cls))
}
export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
	if (!element || !styleName) return ''

	let key = camelCase(styleName)
	if (key === 'float') key = 'cssFloat'
	try {
		const style = (element.style as any)[key]
		if (style) return style
		const computed: any = document.defaultView?.getComputedStyle(element, '')
		return computed ? computed[key] : ''
	} catch {
		return (element.style as any)[key]
	}
}

export const setStyle = (element: HTMLElement, styleName: CSSProperties | keyof CSSProperties, value?: string | number) => {
	if (!element || !styleName) return

	if (isObject(styleName)) {
		entriesOf(styleName).forEach(([prop, value]) => setStyle(element, prop, value))
	} else {
		const key: any = camelCase(styleName)
		element.style[key] = value as any
	}
}

export const removeStyle = (element: HTMLElement, style: CSSProperties | keyof CSSProperties) => {
	if (!element || !style) return

	if (isObject(style)) {
		keysOf(style).forEach(prop => removeStyle(element, prop))
	} else {
		setStyle(element, style, '')
	}
}

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> =
	| (() => TargetValue<T>)
	| TargetValue<T>
	| MutableRefObject<TargetValue<T>>

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
	if (!isBrowser) {
		return undefined
	}

	if (!target) {
		return defaultElement
	}

	let targetElement: TargetValue<T>

	if (isFunction(target)) {
		targetElement = target()
	} else if ('current' in target) {
		targetElement = target.current
	} else {
		targetElement = target
	}

	return targetElement
}
