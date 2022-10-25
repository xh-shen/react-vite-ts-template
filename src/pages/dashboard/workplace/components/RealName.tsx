/*
 * @Author: shen
 * @Date: 2022-10-25 15:18:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 15:22:38
 * @Description:
 */
import { useState, useEffect } from 'react'
import { sleep } from '@/utils'
import { EChart } from '@/components'
import { Card } from 'antd'

import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const options: EChartsOption = {
	graphic: {
		elements: [
			{
				type: 'text',
				left: 'center',
				top: 'center',
				style: {
					text: 'Shene',
					fontSize: 80,
					fontWeight: 'bold',
					lineDash: [0, 200],
					lineDashOffset: 0,
					fill: 'transparent',
					stroke: '#000',
					lineWidth: 1
				},
				keyframeAnimation: {
					duration: 3000,
					loop: true,
					keyframes: [
						{
							percent: 0.7,
							style: {
								fill: 'transparent',
								lineDashOffset: 200,
								lineDash: [200, 0]
							}
						},
						{
							// Stop for a while.
							percent: 0.8,
							style: {
								fill: 'transparent'
							}
						},
						{
							percent: 1,
							style: {
								fill: 'black'
							}
						}
					]
				}
			}
		]
	}
}

const RealName: FC = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		sleep(1000).then(() => setLoading(false))
	}, [])
	return (
		<Card loading={loading} title="我是谁" style={{ marginTop: 16 }}>
			<EChart height="200px" options={options} />
		</Card>
	)
}

export default RealName
