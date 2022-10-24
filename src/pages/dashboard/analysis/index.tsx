/*
 * @Author: shen
 * @Date: 2022-10-20 16:51:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-24 15:52:23
 * @Description:
 */
import { PageContainer } from '@/components'
import FirstRow from './components/FirstRow'
import TwoRow from './components/TwoRow'
import ThreeRow from './components/ThreeRow'
import './index.less'

import type { FC } from 'react'

const Dashboard: FC = () => {
	return (
		<PageContainer>
			<FirstRow />
			<TwoRow />
			<ThreeRow />
		</PageContainer>
	)
}

export default Dashboard
