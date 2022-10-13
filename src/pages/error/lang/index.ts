/*
 * @Author: shen
 * @Date: 2022-09-26 15:58:10
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 08:45:39
 * @Description:
 */
import { addResourceBundles } from '@/locale'

const resources = import.meta.glob('./*.ts', { eager: true })

addResourceBundles(resources, 'error')
