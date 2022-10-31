/*
 * @Author: shen
 * @Date: 2022-10-31 09:23:57
 * @LastEditors: shen
 * @LastEditTime: 2022-10-31 16:01:55
 * @Description:
 */
import { createContext, useContext } from 'react'
import type { ReactNode, FC } from 'react'

export type LocaleType = 'zh-CN' | 'en' | undefined
export const LocaleContext = createContext<LocaleType>(undefined)

export interface LocaleContextProps {
	lang?: LocaleType
	children?: ReactNode
}

export const LocaleContextProvider: FC<LocaleContextProps> = ({ lang, children }) => {
	return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
}

export const useLocaleContext = () => useContext(LocaleContext)

export default LocaleContext
