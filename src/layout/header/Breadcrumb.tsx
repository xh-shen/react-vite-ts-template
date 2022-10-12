/*
 * @Author: shen
 * @Date: 2022-10-12 13:23:43
 * @LastEditors: shen
 * @LastEditTime: 2022-10-12 14:19:27
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { useAppSelector } from '@/store'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import type { FC } from 'react'

const Breadcrumb: FC = () => {
	const prefixCls = usePrefixCls('layout-breadcrumb')
	const matchMenus = useAppSelector(state => state.permission.matchMenus)

	return (
		<AntdBreadcrumb className={prefixCls}>
			{matchMenus.map(item => (
				<AntdBreadcrumb.Item key={item.id}>{item.title}</AntdBreadcrumb.Item>
			))}
		</AntdBreadcrumb>
	)
}

export default Breadcrumb
