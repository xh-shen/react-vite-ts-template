/*
 * @Author: shen
 * @Date: 2022-10-09 12:36:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 12:36:36
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { SvgIcon } from '@/components'

import type { FC } from 'react'

const Question: FC = () => {
	const prefixCls = usePrefixCls('layout-action')
	return (
		<span className={`${prefixCls} ${prefixCls}-question`}>
			<SvgIcon name="question-line" />
		</span>
	)
}

export default Question
