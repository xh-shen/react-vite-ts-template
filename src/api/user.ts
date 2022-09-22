/*
 * @Author: shen
 * @Date: 2022-09-22 14:16:47
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 14:16:59
 * @Description:
 */
import request from '@/request'

export const login = (params: any) => request.post('/login', params)
