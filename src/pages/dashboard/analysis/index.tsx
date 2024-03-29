/*
 * @Author: shen
 * @Date: 2022-10-20 16:51:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:39:29
 * @Description:
 */
import { PageContainer } from '@/components'
import { usePrefixCls } from '@/hooks'
import FirstRow from './components/FirstRow'
import TwoRow from './components/TwoRow'
import ThreeRow from './components/ThreeRow'
import Map from './components/Map'
import './index.less'

import type { FC } from 'react'

const Analysis: FC = () => {
	const prefixCls = usePrefixCls('analysis')
	return (
		<PageContainer className={prefixCls}>
			<FirstRow />
			<TwoRow />
			<ThreeRow />
			<Map />
		</PageContainer>
	)
}

export default Analysis
