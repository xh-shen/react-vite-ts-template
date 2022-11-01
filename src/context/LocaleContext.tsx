/*
 * @Author: shen
 * @Date: 2022-10-31 09:23:57
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:29:20
 * @Description:
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { getLang, setLang as setLocalLang } from '@/utils'
import config from '@/config'

import type { ReactNode, FC } from 'react'

export const defaultLocale = config.lang

export const LocaleContext = createContext<LocaleType>(defaultLocale)
export const DispatchLocaleContext = createContext<((locale: LocaleType) => void) | undefined>(undefined)

export interface LocaleContextProps {
	children?: ReactNode
}

export const LocaleContextProvider: FC<LocaleContextProps> = ({ children }) => {
	const [locale, setLocale] = useState(() => getLang() || defaultLocale)
	const updateLocale = useCallback((locale: LocaleType) => {
		setLocale(locale)
		setLocalLang(locale)
		window.location.reload()
	}, [])
	return (
		<DispatchLocaleContext.Provider value={updateLocale}>
			<LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
		</DispatchLocaleContext.Provider>
	)
}

export const useLocaleContext = () => useContext(LocaleContext)
export const useDispatchLocaleContext = () => useContext(DispatchLocaleContext)
export const useLocale: () => [LocaleType, (locale: LocaleType) => void] = () => [useLocaleContext(), useDispatchLocaleContext()!]

export default LocaleContext
