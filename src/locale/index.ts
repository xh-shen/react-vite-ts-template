/*
 * @Author: shen
 * @Date: 2022-09-26 14:03:51
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 12:54:36
 * @Description:
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLang } from '@/utils'
import config from '@/config'

const defaultLang = getLang() || config.lang

const langMap = {
	'zh-cn': 'zh-CN'
}

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
	i18n.use(initReactI18next).init({
		lng: langMap[defaultLang] || defaultLang,
		resources: {
			[langMap[defaultLang] || defaultLang]: {
				translation: transformResources(defaultLang)
			}
		},
		fallbackLng: langMap[defaultLang] || defaultLang,
		debug: false,
		interpolation: {
			escapeValue: false
		}
	})
}

export function addResourceBundles(bundles: Record<string, any>, pageKey?: string) {
	setTimeout(() => {
		Object.keys(bundles).forEach((key: string) => {
			const lng = key.match(/.*\/(.*)\..*/)?.[1]
			if (lng === defaultLang) {
				const resources = (bundles[key] as any).default ?? {}
				const _pageKey = pageKey || Object.keys(resources)[0]
				const res = i18n.getResource(langMap[defaultLang] || defaultLang, 'translation', _pageKey)
				if (!res) {
					i18n.addResourceBundle(langMap[defaultLang] || defaultLang, 'translation', resources, true, true)
				}
			}
		})
	})
}

export default i18n
