/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 10:07:07
 * @Description:
 */

import { BrowserRouter } from 'react-router-dom'
import RenderRouter from './router'
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<RenderRouter />
			</BrowserRouter>
		</div>
	)
}

export default App
