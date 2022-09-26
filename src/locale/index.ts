/*
 * @Author: shen
 * @Date: 2022-09-26 14:03:51
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 14:59:00
 * @Description:
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { store } from '@/store'

const resources = import.meta.glob('./lang/*.ts', { eager: true })

const transformResources = () => {
	const data: Record<string, any> = {}
	Object.keys(resources).forEach((key: string) => {
		const lng = key.match(/.*\/.*\/(.*)\..*/)?.[1]
		if (lng) {
			data[lng] = {
				translation: (resources[key] as any).default
			}
		}
	})
	return data
}

export function setupI18n() {
	const state = store.getState()

	i18n.use(initReactI18next).init({
		resources: transformResources(),
		fallbackLng: state.app.lang,
		debug: false,
		interpolation: {
			escapeValue: false
		}
	})
}

export default i18n
