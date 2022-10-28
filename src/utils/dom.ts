/*
 * @Author: shen
 * @Date: 2022-10-13 20:22:30
 * @LastEditors: shen
 * @LastEditTime: 2022-10-28 22:09:42
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

export const canUseDom = () => {
	return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}
export const contains = (root: Node | null | undefined, n?: Node) => {
	if (!root) {
		return false
	}

	if (root.contains) {
		return root.contains(n!)
	}

	let node = n
	while (node) {
		if (node === root) {
			return true
		}
		node = node.parentNode as any
	}

	return false
}
const APPEND_ORDER = 'data-order'
const MARK_KEY = `util-key`

const containerCache = new Map<Element, Node & ParentNode>()

export type Prepend = boolean | 'queue'
export type AppendType = 'prependQueue' | 'append' | 'prepend'

interface Options {
	attachTo?: Element
	csp?: { nonce?: string }
	prepend?: Prepend
	mark?: string
}

function getMark({ mark }: Options = {}) {
	if (mark) {
		return mark.startsWith('data-') ? mark : `data-${mark}`
	}
	return MARK_KEY
}

function getContainer(option: Options) {
	if (option.attachTo) {
		return option.attachTo
	}

	const head = document.querySelector('head')
	return head || document.body
}

function getOrder(prepend?: Prepend): AppendType {
	if (prepend === 'queue') {
		return 'prependQueue'
	}

	return prepend ? 'prepend' : 'append'
}

function findStyles(container: Element) {
	return Array.from((containerCache.get(container) || container).children).filter(
		node => node.tagName === 'STYLE'
	) as HTMLStyleElement[]
}

export function injectCSS(css: string, option: Options = {}) {
	if (!canUseDom()) {
		return null
	}

	const { csp, prepend } = option

	const styleNode = document.createElement('style')
	styleNode.setAttribute(APPEND_ORDER, getOrder(prepend))

	if (csp?.nonce) {
		styleNode.nonce = csp?.nonce
	}
	styleNode.innerHTML = css

	const container = getContainer(option)
	const { firstChild } = container

	if (prepend) {
		if (prepend === 'queue') {
			const existStyle = findStyles(container).filter(node =>
				['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER) as string)
			)
			if (existStyle.length) {
				container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling)

				return styleNode
			}
		}

		container.insertBefore(styleNode, firstChild)
	} else {
		container.appendChild(styleNode)
	}

	return styleNode
}

function findExistNode(key: string, option: Options = {}) {
	const container = getContainer(option)

	return findStyles(container).find(node => node.getAttribute(getMark(option)) === key)
}

export function removeCSS(key: string, option: Options = {}) {
	const existNode = findExistNode(key, option)
	existNode?.parentNode?.removeChild(existNode)
}

function syncRealContainer(container: Element, option: Options) {
	const cachedRealContainer = containerCache.get(container)

	if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
		const placeholderStyle = injectCSS('', option)
		const { parentNode } = placeholderStyle!
		containerCache.set(container, parentNode!)
		parentNode!.removeChild(placeholderStyle!)
	}
}

export function updateCSS(css: string, key: string, option: Options = {}) {
	const container = getContainer(option)

	syncRealContainer(container, option)

	const existNode = findExistNode(key, option)

	if (existNode) {
		if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
			existNode.nonce = option.csp?.nonce
		}

		if (existNode.innerHTML !== css) {
			existNode.innerHTML = css
		}

		return existNode
	}

	const newNode = injectCSS(css, option)
	newNode!.setAttribute(getMark(option), key)
	return newNode
}
