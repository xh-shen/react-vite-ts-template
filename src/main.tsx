/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 10:16:58
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { setupI18n } from './locale'
import App from './App'

import 'virtual:svg-icons-register'
import './styles/index.less'

setupI18n()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
)
