/*
 * @Author: shen
 * @Date: 2022-09-30 14:22:04
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:01:38
 * @Description:
 */
import { isPromise } from './validate'

export const sleep = async (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay))
}

export function stringify<K extends string | number | symbol, V>(obj: Record<K, V> | Map<K, V>) {
	let tgt: Record<K, V>

	if (obj instanceof Map) {
		tgt = {} as any
		obj.forEach((v, k) => {
			tgt[k] = v
		})
	} else {
		tgt = obj
	}

	return JSON.stringify(tgt)
}
export function toPromise(promiseLike: Promise<unknown> | unknown) {
	if (isPromise(promiseLike)) {
		return promiseLike
	}

	return Promise.resolve(promiseLike)
}
