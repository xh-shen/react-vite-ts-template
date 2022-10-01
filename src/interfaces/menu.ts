/*
 * @Author: shen
 * @Date: 2022-10-01 08:01:16
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:06:45
 * @Description:
 */

export interface Menu {
	id: string
	pid: string
	path: string
	icon: string
	title: string
	[key: string]: any
}
