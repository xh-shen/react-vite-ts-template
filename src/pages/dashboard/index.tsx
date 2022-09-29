/*
 * @Author: shen
 * @Date: 2022-09-29 09:03:52
 * @LastEditors: shen
 * @LastEditTime: 2022-09-29 16:43:42
 * @Description:
 */
import { useAppSelector } from '@/store'
import type { FC } from 'react'

const Dashboard: FC = () => {
	console.log('首页')
	const userInfo = useAppSelector(state => state.user.info)
	console.log(userInfo)

	return <div>Dashboard</div>
}

export default Dashboard
