/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 13:56:50
 * @Description:
 */
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import Provider from './Provider'
import AntdProvider from './AntdProvider'

import type { FC } from 'react'

const App: FC = () => {
	return (
		<BrowserRouter>
			<Provider>
				<AntdProvider>
					<Router />
				</AntdProvider>
			</Provider>
		</BrowserRouter>
	)
}

export default App
