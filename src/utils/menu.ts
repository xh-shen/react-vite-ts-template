/*
 * @Author: shen
 * @Date: 2022-09-26 15:30:12
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 20:46:52
 * @Description:
 */
import i18n from '@/locale'

import type { MenuData } from '@/interfaces'

export const genAnalysisMenu = (): MenuData => ({
	title: i18n.t('app.analysis'),
	path: '/dashboard/analysis',
	icon: '',
	pid: 'dashboard',
	id: 'analysis'
})
export const genDashboardMenu = (): MenuData[] => [
	{
		title: 'Dashboard',
		path: '/dashboard',
		icon: 'dashboard-line',
		pid: '0',
		id: 'dashboard'
	},
	{ ...genAnalysisMenu() },
	{
		title: i18n.t('app.workplace'),
		path: '/dashboard/workplace',
		icon: '',
		pid: 'dashboard',
		id: 'workplace'
	}
]
