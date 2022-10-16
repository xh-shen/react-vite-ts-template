/*
 * @Author: shen
 * @Date: 2022-10-12 13:23:43
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 14:54:31
 * @Description:
 */
import { SvgIcon } from '@/components'
import { useAppSetting, usePrefixCls } from '@/hooks'
import { useAppSelector } from '@/store'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import type { FC } from 'react'

const Breadcrumb: FC = () => {
	const prefixCls = usePrefixCls('layout-breadcrumb')
	const matchMenus = useAppSelector(state => state.permission.matchMenus)
	const { showBreadcrumbIcon } = useAppSetting()
	return (
		<AntdBreadcrumb className={prefixCls}>
			{matchMenus.map(item => (
				<AntdBreadcrumb.Item key={item.id}>
					{item.icon && showBreadcrumbIcon && <SvgIcon name={item.icon} />}
					<span>{item.title}</span>
				</AntdBreadcrumb.Item>
			))}
		</AntdBreadcrumb>
	)
}

export default Breadcrumb
