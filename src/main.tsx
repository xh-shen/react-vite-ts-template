/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-27 16:50:57
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import { setupI18n } from './locale'
import App from './App'

import 'virtual:svg-icons-register'
// import 'antd/dist/antd.css'
import 'antd/dist/antd.variable.min.css'
import './styles/index.less'

setupI18n()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
)
