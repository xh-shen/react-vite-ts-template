/*
 * @Author: shen
 * @Date: 2022-10-09 12:40:37
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 13:56:37
 * @Description:
 */
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'

const items: MenuProps['items'] = [
	{
		label: '首页',
		key: 'mail',
		icon: <MailOutlined />
	},
	{
		label: '表单',
		key: 'SubMenu',
		icon: <SettingOutlined />,
		children: [
			{
				type: 'group',
				label: 'Item 1',
				children: [
					{
						label: 'Option 1',
						key: 'setting:1'
					},
					{
						label: 'Option 2',
						key: 'setting:2'
					}
				]
			},
			{
				type: 'group',
				label: 'Item 2',
				children: [
					{
						label: 'Option 3',
						key: 'setting:3'
					},
					{
						label: 'Option 4',
						key: 'setting:4'
					}
				]
			}
		]
	},
	{
		label: '表格',
		key: 'table',
		icon: <SettingOutlined />,
		children: [
			{
				type: 'group',
				label: 'Item 1',
				children: [
					{
						label: 'Option 1',
						key: 'setting:11'
					},
					{
						label: 'Option 2',
						key: 'setting:22'
					}
				]
			},
			{
				type: 'group',
				label: 'Item 2',
				children: [
					{
						label: 'Option 3',
						key: 'setting:44'
					},
					{
						label: 'Option 4',
						key: 'setting:55'
					}
				]
			}
		]
	},
	{
		label: (
			<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
				Navigation Four - Link
			</a>
		),
		key: 'alipay'
	}
]

const LayoutMenu: React.FC = () => {
	const [current, setCurrent] = useState('mail')

	const onClick: MenuProps['onClick'] = e => {
		console.log('click ', e)
		setCurrent(e.key)
	}

	return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default LayoutMenu
