/*
 * @Author: shen
 * @Date: 2022-10-31 09:24:19
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:30:16
 * @Description:
 */
import { createContext, useContext, useCallback, useState } from 'react'
import { getSize as getLocalSize, setSize as setLocalSize } from '@/utils'
import config from '@/config'
import type { ReactNode, FC } from 'react'

export const defaultSize = config.size

export const SizeContext = createContext<SizeType>(defaultSize)
export const DispatchSizeContext = createContext<((size: SizeType) => void) | undefined>(undefined)

export interface SizeContextProps {
	children?: ReactNode
}

export const SizeContextProvider: FC<SizeContextProps> = ({ children }) => {
	const [size, setSize] = useState(() => getLocalSize() || defaultSize)
	const updateSize = useCallback((size: SizeType) => {
		setSize(size)
		setLocalSize(size)
	}, [])
	return (
		<DispatchSizeContext.Provider value={updateSize}>
			<SizeContext.Provider value={size}>{children}</SizeContext.Provider>
		</DispatchSizeContext.Provider>
	)
}

export const useSizeContext = () => useContext(SizeContext)
export const useDispatchSizeContext = () => useContext(DispatchSizeContext)

export const useSize: () => [SizeType, (size: SizeType) => void] = () => [useSizeContext(), useDispatchSizeContext()!]

export default SizeContext
