/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 11:52:46
 * @Description:
 */
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useAntdLanguage, useAppSetting, useDarkreader } from './hooks'
import Router from './router'

import type { FC } from 'react'
const App: FC = () => {
	const antdLanguage = useAntdLanguage()
	const { themeColor, pageStyle } = useAppSetting()
	useDarkreader(pageStyle === 'realDark')
	useEffect(() => {
		ConfigProvider.config({
			theme: { primaryColor: themeColor }
		})
	}, [themeColor])

	return (
		<BrowserRouter>
			<ConfigProvider locale={antdLanguage}>
				<Router />
			</ConfigProvider>
		</BrowserRouter>
	)
}

export default App
