/*
 * @Author: shen
 * @Date: 2022-09-28 09:22:28
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:50:24
 * @Description:
 */
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector, setAppLang } from '@/store'
import i18n from '@/locale'
import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import 'moment/locale/zh-cn'

import type { Locale } from 'antd/lib/locale-provider'

export const useLanguage = (): [string, (language: string) => void] => {
	const lang = useAppSelector(state => state.app.lang)
	const dispatch = useAppDispatch()

	const setLanguage = (language: string) => {
		return new Promise((resolve: (value: string) => void) => {
			i18n.changeLanguage(language).then(() => {
				dispatch(setAppLang(language))
				resolve(language)
				window.location.reload()
			})
		})
	}

	return [lang, setLanguage]
}

const languageToAntdMap: Record<string, Locale> = {
	en: enUS,
	'zh-CN': zhCN
}

const languageToMomentMap: Record<string, string> = {
	en: 'en',
	'zh-CN': 'zh-cn'
}

export const useAntdLanguage = () => {
	const [language] = useLanguage()
	const [antdLanguage, setAntdLanguage] = useState<Locale>(languageToAntdMap[language])

	useEffect(() => {
		setAntdLanguage(languageToAntdMap[language])
		moment.locale(languageToMomentMap[language])
	}, [language])

	return antdLanguage
}
