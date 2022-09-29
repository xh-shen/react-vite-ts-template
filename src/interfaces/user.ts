/*
 * @Author: shen
 * @Date: 2022-09-26 10:25:24
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 13:35:15
 * @Description:
 */
export interface LoginParams {
	username: string
	password: string
}

export interface LoginResult {
	token: string
}

export interface UserInfo {
	id: string
	username: string
	realName: string
	phone: string
	avatar: string
	roleName: string
	role: string
	sex: string
}
