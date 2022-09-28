/*
 * @Author: shen
 * @Date: 2022-09-28 09:22:28
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 09:39:34
 * @Description:
 */

import { useAppDispatch, useAppSelector, setAppLang } from '@/store'
import i18n from '@/locale'

export const useLanguage = (): [string, (language: string) => void] => {
	const lang = useAppSelector(state => state.app.lang)
	const dispatch = useAppDispatch()

	const setLanguage = (language: string) => {
		i18n.changeLanguage(language)
		dispatch(setAppLang(language))
	}

	return [lang, setLanguage]
}
