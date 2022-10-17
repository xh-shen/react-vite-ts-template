/*
 * @Author: shen
 * @Date: 2022-09-26 15:30:12
 * @LastEditors: shen
 * @LastEditTime: 2022-10-17 08:27:14
 * @Description:
 */
import i18n from '@/locale'

import type { MenuData } from '@/interfaces'

export const genDashboardMenu = (): MenuData => ({
	title: i18n.t('app.dashboard'),
	path: '/dashboard',
	icon: 'dashboard-line',
	pid: '0',
	id: 'dashboard'
})
