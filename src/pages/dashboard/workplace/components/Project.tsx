/*
 * @Author: shen
 * @Date: 2022-10-25 13:59:03
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:56:56
 * @Description:
 */
import { useState, useEffect } from 'react'
import { SvgIcon } from '@/components'
import { sleep } from '@/utils'
import { Card } from 'antd'

import type { FC, CSSProperties } from 'react'

const gridStyle: CSSProperties = {
	width: '33.33%'
}

const { Meta } = Card

const list = [
	{
		icon: 'github',
		title: 'Github',
		key: 'Github',
		author: '可望不可及',
		date: '5秒前',
		iconColor: '#000',
		description: '愚痴的人，一直想要别人了解他；有智慧的人，却努力的了解自己。'
	},
	{
		icon: 'vue',
		title: 'Vue',
		key: 'Vue',
		author: '情殇真的很伤',
		date: '10分钟前',
		iconColor: 'rgb(66, 184, 131)',
		description: '再长的路，一步步也能走完；再短的路，不迈开双脚也无法到达。'
	},
	{
		icon: 'react',
		title: 'React',
		key: 'React',
		author: '无所谓',
		date: '20小时前',
		iconColor: 'rgb(0, 216, 255)',
		description: '挫折经历的太少，所以总是把一些琐碎的小事看得很重。'
	},
	{
		icon: 'angular',
		title: 'Angular',
		key: 'Angular',
		author: '浮华总有尽',
		date: '10天前',
		iconColor: 'rgb(191, 12, 44)',
		description: '有些人因为贪婪，想得更多的东西，却把现在所有的也失掉了。'
	},
	{
		icon: 'html5',
		title: 'Html5',
		key: 'Html5',
		author: '终究太多伤',
		date: '3个月前',
		iconColor: 'rgb(225, 133, 37)',
		description: '如果我们都去做自己能力做得到的事，我们会让自己大吃一惊。'
	},
	{
		icon: 'javascript',
		title: 'Javascript',
		key: 'Javascript',
		author: '烟花散尽',
		date: '1年前',
		iconColor: 'rgb(235, 217, 78)',
		description: '人生是一条没有回程的单行线，上帝不会给你一张返程的票。'
	}
]

const Project: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])

	return (
		<Card title="进行中的项目" extra={<a href="#">全部项目</a>} style={{ marginTop: 16 }} loading={loading} className="project">
			{list.map(item => (
				<Card.Grid key={item.key} style={gridStyle}>
					<Meta
						title={
							<div className="project-title">
								<SvgIcon name={item.icon} style={{ fontSize: 24, color: item.iconColor }} />
								<span>{item.title}</span>
							</div>
						}
						description={item.description}
					/>
					<div className="project-item">
						<a>{item.author}</a>
						<span>{item.date}</span>
					</div>
				</Card.Grid>
			))}
		</Card>
	)
}
export default Project
