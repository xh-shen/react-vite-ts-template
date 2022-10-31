/*
 * @Author: shen
 * @Date: 2022-10-31 09:24:19
 * @LastEditors: shen
 * @LastEditTime: 2022-10-31 14:10:29
 * @Description:
 */
import { createContext, useContext } from 'react'
import type { ReactNode, FC } from 'react'

export type SizeType = 'small' | 'middle' | 'large' | undefined
export const SizeContext = createContext<SizeType>(undefined)

export interface SizeContextProps {
	size?: SizeType
	children?: ReactNode
}

export const SizeContextProvider: FC<SizeContextProps> = ({ size, children }) => {
	return <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
}

export const useSizeContext = () => useContext(SizeContext)

export default SizeContext
