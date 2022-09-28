/*
 * @Author: shen
 * @Date: 2022-09-28 09:22:28
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 10:51:06
 * @Description:
 */

import { useAppDispatch, useAppSelector, setAppLang } from '@/store'
import i18n from '@/locale'

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
