/*
 * @Author: shen
 * @Date: 2022-09-26 10:25:24
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 13:13:15
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
	username: string
	name: string
}
