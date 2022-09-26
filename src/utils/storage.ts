/*
 * @Author: shen
 * @Date: 2022-05-15 22:21:14
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 10:22:44
 * @Description:
 */
type Key = 'localStorage' | 'sessionStorage'

function storageFactory(key: Key) {
	const store = window[key]
	return {
		set(key: string, value: any) {
			store.setItem(key, JSON.stringify(value))
		},
		get<T>(key: string): T {
			return (store.getItem(key) ? JSON.parse(store.getItem(key) as string) : undefined) as T
		},
		remove(key: string) {
			store.removeItem(key)
		}
	}
}

export const local = storageFactory('localStorage')
export const session = storageFactory('sessionStorage')
