/*
 * @Author: shen
 * @Date: 2022-04-11 10:11:59
 * @LastEditors: shen
 * @LastEditTime: 2022-10-14 14:11:45
 * @Description:
 */
const availablePrefixs = ['moz', 'ms', 'webkit']

function requestAnimationFramePolyfill() {
	let lastTime = 0
	return function (callback: any) {
		const currTime = new Date().getTime()
		const timeToCall = Math.max(0, 16 - (currTime - lastTime))
		const id = window.setTimeout(function () {
			callback(currTime + timeToCall)
		}, timeToCall)
		lastTime = currTime + timeToCall
		return id
	}
}

export function getRequestAnimationFrame() {
	if (typeof window === 'undefined') {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {}
	}
	if (window.requestAnimationFrame) {
		return window.requestAnimationFrame.bind(window)
	}

	const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0]

	return prefix ? window[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill()
}

export function cancelRequestAnimationFrame(id: any) {
	if (typeof window === 'undefined') {
		return null
	}
	if (window.cancelAnimationFrame) {
		return window.cancelAnimationFrame(id)
	}
	const prefix = availablePrefixs.filter(
		key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
	)[0]

	return prefix
		? //@ts-ignore
		  (window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]).call(this, id)
		: clearTimeout(id)
}
