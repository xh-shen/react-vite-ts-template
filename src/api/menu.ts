/*
 * @Author: shen
 * @Date: 2022-10-01 08:38:06
 * @LastEditors: shen
 * @LastEditTime: 2022-10-01 08:44:39
 * @Description:
 */
import request from '@/request'
import type { Menu } from '@/interfaces'
export const getAuthorizedMenu = () => request.get<Menu[]>('/getAuthorizedMenu')
