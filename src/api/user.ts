/*
 * @Author: shen
 * @Date: 2022-09-26 09:24:38
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:02:24
 * @Description:
 */
import request from '@/request'
import type { LoginResult, LoginParams, User } from '@/interfaces'

export const login = <T = LoginParams>(params: T) => request.post<LoginResult>('/login', params)

export const getUserInfo = () => request.get<User>('/getUserInfo')
