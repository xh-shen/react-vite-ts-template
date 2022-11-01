/*
 * @Author: shen
 * @Date: 2022-10-30 14:58:48
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 14:19:24
 * @Description:
 */
import {
	AppContextProvider,
	LocaleContextProvider,
	ThemeColorContextProvider,
	SizeContextProvider,
	DarkModeContextProvider
} from './context'

function composeProviders(...providers) {
	return ({ children }) => providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children)
}
const Provider = composeProviders(
	SizeContextProvider,
	LocaleContextProvider,
	ThemeColorContextProvider,
	DarkModeContextProvider,
	AppContextProvider
)
export default Provider
