/*
 * @Author: shen
 * @Date: 2022-09-29 13:45:06
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 16:04:06
 * @Description:
 */
import { Suspense } from 'react'
import { Spin } from 'antd'

import type { LazyExoticComponent, ReactNode } from 'react'
const lazyLoad = (Comp: LazyExoticComponent<any>): ReactNode => {
	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '100%'
					}}
				/>
			}
		>
			<Comp />
		</Suspense>
	)
}

export default lazyLoad
