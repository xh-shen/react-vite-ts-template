/*
 * @Author: shen
 * @Date: 2022-09-26 14:03:51
 * @LastEditors: shen
 * @LastEditTime: 2022-10-26 20:48:02
 * @Description:
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { store } from '@/store'

const resources = import.meta.glob('./lang/*.ts', { eager: true })
const componentResources = import.meta.glob('../components/locale/*.ts', { eager: true })

const transformResources = (lang: string) => {
	const paths = Object.keys({ ...resources, ...componentResources })
		.map(path => ({ path, lang: path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')) }))
		.filter(item => item.lang === lang)
		.map(item => item.path)
	return {
		...((resources[paths[0]] || {}) as any).default,
		...((componentResources[paths[1]] || {}) as any).default
	}
}

export function setupI18n() {
	const state = store.getState()
	i18n.use(initReactI18next).init({
		resources: {
			[state.app.lang]: {
				translation: transformResources(state.app.lang)
			}
		},
		fallbackLng: state.app.lang,
		debug: false,
		interpolation: {
			escapeValue: false
		}
	})
}

export function addResourceBundles(bundles: Record<string, any>, pageKey?: string) {
	const state = store.getState()
	setTimeout(() => {
		Object.keys(bundles).forEach((key: string) => {
			const lng = key.match(/.*\/(.*)\..*/)?.[1]
			if (lng === state.app.lang) {
				const resources = (bundles[key] as any).default ?? {}
				const _pageKey = pageKey || Object.keys(resources)[0]
				const res = i18n.getResource(lng, 'translation', _pageKey)
				if (!res) {
					i18n.addResourceBundle(lng, 'translation', resources, true, true)
				}
			}
		})
	})
}

export default i18n
