/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 15:45:16
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { store } from './store'
import { Provider } from 'react-redux'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
