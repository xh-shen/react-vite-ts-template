/*
 * @Author: shen
 * @Date: 2022-10-31 16:30:15
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 14:15:42
 * @Description:
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { getThemeColor as getLocalThemeColor, setThemeColor as setLocalThemeColor, removeThemeColor } from '@/utils'
import setting from '@/defaultSetting'

import type { ReactNode, FC } from 'react'

export interface DispatchThemeColorConsumerProps {
	updateThemeColor: (color: string) => void
	resetThemeColor: () => void
}

export const defaultThemeColor = setting.themeColor
export const ThemeColorContext = createContext<string>(defaultThemeColor)
export const DispatchThemeColorContext = createContext<DispatchThemeColorConsumerProps>({} as DispatchThemeColorConsumerProps)

export interface ThemeColorContextProps {
	children?: ReactNode
}

export const ThemeColorContextProvider: FC<ThemeColorContextProps> = ({ children }) => {
	const [color, setColor] = useState(() => getLocalThemeColor() || defaultThemeColor)
	const updateThemeColor = useCallback((color: string) => {
		setColor(color)
		setLocalThemeColor(color)
	}, [])

	const resetThemeColor = useCallback(() => {
		setColor(defaultThemeColor)
		removeThemeColor()
	}, [])

	return (
		<DispatchThemeColorContext.Provider value={{ updateThemeColor, resetThemeColor }}>
			<ThemeColorContext.Provider value={color}>{children}</ThemeColorContext.Provider>
		</DispatchThemeColorContext.Provider>
	)
}

export const useThemeColorContext = () => useContext(ThemeColorContext)
export const useDispatchThemeColorContext = () => useContext(DispatchThemeColorContext)
export const useThemeColor: () => [string, DispatchThemeColorConsumerProps] = () => [
	useThemeColorContext(),
	useDispatchThemeColorContext()
]
export default ThemeColorContext
