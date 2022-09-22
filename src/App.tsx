/*
 * @Author: shen
 * @Date: 2022-09-20 09:48:07
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 16:39:49
 * @Description:
 */
import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './store/reducer/counter'
import { setUserInfo } from './store/reducer/app'
import './App.css'

function App() {
	const userInfo = useSelector((state: RootState) => state.app.userInfo)
	const count = useSelector((state: RootState) => state.counter.value)
	const dispatch = useDispatch()

	return (
		<div>
			<div>
				{userInfo.username}-{userInfo.sex}-{userInfo.name}
				<br />
				<button aria-label="Increment value" onClick={() => dispatch(increment())}>
					Increment
				</button>
				<span>{count}</span>
				<button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
					Decrement
				</button>
				<button aria-label="Decrement value" onClick={() => dispatch(incrementByAmount(-1))}>
					incrementByAmount
				</button>
				<br />
				<button onClick={() => dispatch(setUserInfo({ ...userInfo, name: '测试' }))}>setUserInfo</button>
			</div>
		</div>
	)
}

export default App
