/*
 * @Author: shen
 * @Date: 2022-09-23 15:03:55
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:02:25
 * @Description:
 */

import type { FC } from 'react'
import AccountForm from './components/AccountForm'

const Login: FC = () => {
	return (
		<div className="login">
			<AccountForm />
		</div>
	)
}

export default Login
