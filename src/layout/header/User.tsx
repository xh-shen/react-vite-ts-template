/*
 * @Author: shen
 * @Date: 2022-10-09 10:20:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 12:20:57
 * @Description:
 */
import { Dropdown, Menu, Avatar } from 'antd'
import { usePrefixCls } from '@/hooks'
import { SvgIcon } from '@/components'
import { useAppSelector, useAppDispatch, setAppInvalid } from '@/store'

import type { FC } from 'react'

const User: FC = () => {
	const prefixCls = usePrefixCls('layout-action')

	const info = useAppSelector(state => state.user.info)
	const dispatch = useAppDispatch()
	const onLogout = () => {
		dispatch(setAppInvalid(true))
	}

	const menu = (
		<Menu
			style={{ minWidth: 160 }}
			items={[
				{
					key: 'info',
					label: <span style={{ marginLeft: 8 }}>个人中心</span>,
					icon: <SvgIcon name="user-line" />
					// onClick: () => onItemClick('info')
				},
				{
					key: 'setting',
					label: <span style={{ marginLeft: 8 }}>个人设置</span>,
					icon: <SvgIcon name="setting-line" />
					// onClick: () => onItemClick('setting')
				},
				{
					type: 'divider'
				},
				{
					key: 'logout',
					label: <span style={{ marginLeft: 8 }}>退出登录</span>,
					icon: <SvgIcon name="logout-line" />,
					onClick: onLogout
				}
			]}
		/>
	)

	return (
		<Dropdown overlay={menu} placement="bottomLeft">
			<span className={`${prefixCls} ${prefixCls}-user`}>
				<Avatar size="small" src={info.avatar} />
				<span className={`${prefixCls}-user-name`}>{info.realName}</span>
			</span>
		</Dropdown>
	)
}

export default User
