/*
 * @Author: shen
 * @Date: 2022-10-20 16:51:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 16:18:07
 * @Description:
 */
import { PageContainer } from '@/components'
import FirstRow from './components/FirstRow'
import TwoRow from './components/TwoRow'
import './index.less'

import type { FC } from 'react'

const Dashboard: FC = () => {
	return (
		<PageContainer>
			<FirstRow />
			<TwoRow />
		</PageContainer>
	)
}

export default Dashboard
