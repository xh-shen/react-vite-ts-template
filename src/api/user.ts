/*
 * @Author: shen
 * @Date: 2022-09-26 09:24:38
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 13:12:41
 * @Description:
 */
import request from '@/request'
import type { LoginResult, LoginParams } from '@/interfaces'

export const login = <T = LoginParams>(params: T) => request.post<LoginResult>('/login', params)
