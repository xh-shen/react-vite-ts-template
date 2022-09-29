/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 16:41:06
 * @Description:
 */

import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { useAntdLanguage } from './hooks'
import Router from './router'

import type { FC } from 'react'
const App: FC = () => {
	const antdLanguage = useAntdLanguage()
	return (
		<BrowserRouter>
			<ConfigProvider locale={antdLanguage}>
				<Router />
			</ConfigProvider>
		</BrowserRouter>
	)
}

export default App
