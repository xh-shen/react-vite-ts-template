/*
 * @Author: shen
 * @Date: 2022-10-13 20:22:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 20:45:55
 * @Description:
 */
import { isObject } from './validate'
import { entriesOf, keysOf } from './objects'
import { CSSProperties } from 'react'
import { camelCase } from 'lodash-es'

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