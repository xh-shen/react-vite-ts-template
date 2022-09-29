/*
 * @Author: shen
 * @Date: 2022-09-28 09:22:28
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 09:44:18
 * @Description:
 */
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector, setAppLang } from '@/store'
import i18n from '@/locale'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'

import type { Locale } from 'antd/lib/locale-provider'

export const useLanguage = (): [string, (language: string) => void] => {
	const lang = useAppSelector(state => state.app.lang)
	const dispatch = useAppDispatch()

	const setLanguage = (language: string) => {
		return new Promise((resolve: (value: string) => void) => {
			i18n.changeLanguage(language).then(() => {
				dispatch(setAppLang(language))
				resolve(language)
			})
		})
	}

	return [lang, setLanguage]
}

export const useAntdLanguage = () => {
	const [language] = useLanguage()
	const [antdLanguage, setAntdLanguage] = useState<Locale>()

	const languageToAntdMap: Record<string, Locale> = {
		en: enUS,
		'zh-CN': zhCN
	}

	useEffect(() => {
		setAntdLanguage(languageToAntdMap[language])
	}, [language])

	return antdLanguage
}
