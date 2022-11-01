/*
 * @Author: shen
 * @Date: 2022-10-31 16:30:15
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 14:32:56
 * @Description:
 */
import { createContext, useContext, useCallback } from 'react'
import { getDarkMode, setDarkMode, removeDarkMode } from '@/utils'
import setting from '@/defaultSetting'

import type { ReactNode, FC } from 'react'
import { useDarkreader } from '@/hooks'

export interface DispatchDarkModeConsumerProps {
	updateDarkMode: () => void
	resetDarkMode: () => void
}

export const defaultDarkMode = setting.darkMode
export const DarkModeContext = createContext<boolean>(defaultDarkMode)
export const DispatchDarkModeContext = createContext<DispatchDarkModeConsumerProps>({} as DispatchDarkModeConsumerProps)

export interface DarkModeContextProps {
	children?: ReactNode
}

export const DarkModeContextProvider: FC<DarkModeContextProps> = ({ children }) => {
	const [isDark, darken, action] = useDarkreader(getDarkMode() || defaultDarkMode)

	const updateDarkMode = useCallback(() => {
		action.toggle()
		console.log(darken.current)
		setDarkMode(darken.current)
	}, [])

	const resetDarkMode = useCallback(() => {
		removeDarkMode()
		action.reset(defaultDarkMode)
	}, [])

	return (
		<DispatchDarkModeContext.Provider value={{ updateDarkMode, resetDarkMode }}>
			<DarkModeContext.Provider value={isDark}>{children}</DarkModeContext.Provider>
		</DispatchDarkModeContext.Provider>
	)
}

export const useDarkModeContext = () => useContext(DarkModeContext)
export const useDispatchDarkModeContext = () => useContext(DispatchDarkModeContext)
export const useDarkMode: () => [boolean, DispatchDarkModeConsumerProps] = () => [
	useDarkModeContext(),
	useDispatchDarkModeContext()
]
export default DarkModeContext
