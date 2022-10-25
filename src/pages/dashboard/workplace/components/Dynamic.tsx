/*
 * @Author: shen
 * @Date: 2022-10-25 13:59:03
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 14:46:33
 * @Description:
 */
import { useState, useEffect } from 'react'
import { sleep } from '@/utils'
import { Card, List, Avatar } from 'antd'

import type { FC } from 'react'

const data = [
	{
		avatar: 'https://joeschmoe.io/api/v1/josh',
		title: (
			<span>
				张小小 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '刚刚'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/joe',
		title: (
			<span>
				李大大 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '几秒前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/jeri',
		title: (
			<span>
				Shene 在 <a href="#">Github</a> 上传了一个 React 项目模版
			</span>
		),
		date: '10分钟前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/jordan',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '20分钟前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/jerry',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '1小时前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/random',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '10小时前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/random',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '一天前'
	},
	{
		avatar: 'https://api.multiavatar.com/www.miigua.com.svg',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '一周前'
	},
	{
		avatar: 'https://joeschmoe.io/api/v1/random',
		title: (
			<span>
				申某某 在 <a href="#">开源组</a> 创建了项目 <a href="#"> Vue</a>
			</span>
		),
		date: '一个月前'
	}
]

const Dynamic: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])
	return (
		<Card title="最新动态" extra={<a href="#">更多</a>} style={{ marginTop: 16 }} loading={loading}>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.date} />
					</List.Item>
				)}
			/>
		</Card>
	)
}
export default Dynamic
