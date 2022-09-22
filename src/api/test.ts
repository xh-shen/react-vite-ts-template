/*
 * @Author: shen
 * @Date: 2022-09-22 13:37:58
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 13:39:38
 * @Description:
 */
import request from '@/request'

export const getTestData = () => request.get('/get')
