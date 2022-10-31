/*
 * @Author: shen
 * @Date: 2022-10-30 14:58:48
 * @LastEditors: shen
 * @LastEditTime: 2022-10-31 14:35:12
 * @Description:
 */
import { useCallback } from 'react'
import { AppContext } from './context'
import config from './config'

import type { ReactNode, FC } from 'react'
export interface AppProviderProps {
	children?: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
	const getPrefixCls = useCallback((suffixCls?: string, customizePrefixCls?: string) => {
		if (customizePrefixCls) return customizePrefixCls
		const mergedPrefixCls = config.namespace

		return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
	}, [])
	return <AppContext.Provider value={{ getPrefixCls }}>{children}</AppContext.Provider>
}
export default AppProvider
