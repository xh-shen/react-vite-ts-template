/*
 * @Author: shen
 * @Date: 2022-10-13 20:30:28
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 20:40:25
 * @Description:
 */
import { get, set } from 'lodash-es'
import type { Entries } from 'type-fest'

export const keysOf = <T extends Record<string, any>>(arr: T) => Object.keys(arr) as Array<keyof T>
export const entriesOf = <T extends Record<string, any>>(arr: T) => Object.entries(arr) as Entries<T>

export const getProp = <T = any>(obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any): { value: T } => {
	return {
		get value() {
			return get(obj, path, defaultValue)
		},
		set value(val: any) {
			set(obj, path, val)
		}
	}
}
