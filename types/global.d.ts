/*
 * @Author: shen
 * @Date: 2022-10-03 10:13:10
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 08:31:22
 * @Description:
 */

declare type Writable<T> = {
	-readonly [P in keyof T]: T[P]
}

declare interface VoidFunction {
	(): void
}

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = {
	readonly [key: string]: T
}
declare type Indexable<T = any> = {
	[key: string]: T
}
declare type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare type WithFalse<T> = T | false

declare type Arrayable<T> = T | T[]

declare interface ChangeEvent extends Event {
	target: HTMLInputElement
}

declare interface WheelEvent {
	path?: EventTarget[]
}
declare interface ImportMetaEnv extends ViteEnv {
	__: unknown
}

declare interface Fn<T = any, R = T> {
	(...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
	(...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

interface Window {
	APP_DEFAULT_SETTING: Record<string, any>
}

declare interface ViteEnv {
	VITE_PORT: number
	VITE_USE_MOCK: boolean
	VITE_PUBLIC_PATH: string
	VITE_PROXY: [string, string][]
	VITE_APP_TITLE: string
	VITE_DROP_CONSOLE: boolean
	VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
	VITE_LEGACY: boolean
	VITE_USE_IMAGEMIN: boolean
	VITE_APP_THEME_COLOR: string
	VITE_APP_LANGUAGE: LocaleType
	VITE_API_URL_PREFIX: string
	VITE_UPLOAD_URL_PREFIX: string
	VITE_APP_COLOR_WEAK: boolean
	VITE_APP_GRAY_MODE: boolean
	VITE_APP_NAMESPACE: string
	VITE_APP_DARK_MODE: boolean
	VITE_ENABLE_SETTING: boolean
}
