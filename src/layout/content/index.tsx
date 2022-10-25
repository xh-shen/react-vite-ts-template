/*
 * @Author: shen
 * @Date: 2022-10-08 09:11:40
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 18:01:40
 * @Description:
 */
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { useAppSetting, usePrefixCls } from '@/hooks'
import classNames from 'classnames'
import type { FC } from 'react'

const { Content } = Layout

const LayoutContent: FC = () => {
	const prefixCls = usePrefixCls('layout-content')
	const { contentWidth } = useAppSetting()
	return (
		<Content className={prefixCls}>
			<div
				className={classNames(`${prefixCls}-grid`, {
					wide: contentWidth === 'Fixed'
				})}
			>
				<Outlet />
			</div>
		</Content>
	)
}

export default LayoutContent
