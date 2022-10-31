/*
 * @Author: shen
 * @Date: 2022-10-31 13:38:13
 * @LastEditors: shen
 * @LastEditTime: 2022-10-31 14:13:59
 * @Description:
 */
import { createContext, useContext } from 'react'

export interface AppConsumerProps {
	size?: 'small' | 'middle' | 'large'
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
	if (customizePrefixCls) return customizePrefixCls

	return suffixCls ? `shene-${suffixCls}` : 'shene'
}

export const AppContext = createContext<AppConsumerProps>({
	getPrefixCls: defaultGetPrefixCls
})

export const useAppContext = () => useContext(AppContext)

export default AppContext
