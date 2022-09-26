/*
 * @Author: shen
 * @Date: 2022-09-26 09:24:38
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:24:46
 * @Description:
 */
import request from '@/request'

export const login = (params: any) => request.post('/login', params)
