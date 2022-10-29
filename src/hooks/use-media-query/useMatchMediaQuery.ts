/*
 * @Author: shen
 * @Date: 2022-10-29 10:32:06
 * @LastEditors: shen
 * @LastEditTime: 2022-10-29 10:38:57
 * @Description:
 */
import { useLayoutEffect, useState } from 'react'

export default function useMatchMediaQuery(mediaQuery: string) {
	const [matches, setMatches] = useState(() => window.matchMedia(mediaQuery).matches)
	useLayoutEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQuery)
		const listener = (e: any) => setMatches(e.matches)
		mediaQueryList.addListener(listener)
		return () => mediaQueryList.removeListener(listener)
	}, [mediaQuery])
	return matches
}
