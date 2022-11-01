/*
 * @Author: shen
 * @Date: 2022-10-31 13:38:13
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:49:56
 * @Description:
 */
import { createContext, useContext, useCallback } from 'react'
import config from '@/config'

import type { ReactNode, FC } from 'react'

export interface AppConsumerProps {
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}

export const AppContext = createContext<AppConsumerProps>({} as AppConsumerProps)

export interface AppContextProps {
	children?: ReactNode
}

export const AppContextProvider: FC<AppContextProps> = ({ children }) => {
	const getPrefixCls = useCallback((suffixCls?: string, customizePrefixCls?: string) => {
		if (customizePrefixCls) return customizePrefixCls
		return suffixCls ? `${config.namespace}-${suffixCls}` : config.namespace
	}, [])

	return <AppContext.Provider value={{ getPrefixCls }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppContext
