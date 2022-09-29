/*
 * @Author: shen
 * @Date: 2022-09-26 09:24:38
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 13:35:57
 * @Description:
 */
import request from '@/request'
import type { LoginResult, LoginParams, UserInfo } from '@/interfaces'

export const login = <T = LoginParams>(params: T) => request.post<LoginResult>('/login', params)

export const getUserInfo = () => request.get<UserInfo>('/getUserInfo')
