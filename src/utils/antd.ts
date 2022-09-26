/*
 * @Author: shen
 * @Date: 2022-09-26 15:30:12
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 15:39:25
 * @Description:
 */
import { notification } from 'antd'
import i18n from '@/locale'

import type { ReactNode } from 'react'

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export function Notification(description: ReactNode, type: NotificationType = 'success') {
	return notification[type]({
		message: i18n.t('app.notifyTitle') as ReactNode,
		description
	})
}
