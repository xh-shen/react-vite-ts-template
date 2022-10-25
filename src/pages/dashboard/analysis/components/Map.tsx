/*
 * @Author: shen
 * @Date: 2022-10-25 21:36:21
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 21:53:13
 * @Description:
 */
import { useState, useEffect } from 'react'
import { EChart } from '@/components'
import { Card } from 'antd'
import { sleep } from '@/utils'
import { mapData } from '../data'
import { registerMap } from 'echarts'

import type { FC } from 'react'
import type { EChartsOption } from '@/charts'

const Map: FC = () => {
	const [loading, setLoading] = useState(false)
	const [options, setOptions] = useState<EChartsOption>({})

	const register = async () => {
		const json = (await (await import('../China.json')).default) as any
		registerMap('china', json)
		setOptions({
			visualMap: [
				{
					min: 0,
					max: 1000,
					left: 'left',
					top: 'bottom',
					text: ['高', '低'],
					calculable: false,
					orient: 'horizontal',
					inRange: {
						color: ['#e0ffff', '#006edd'],
						symbolSize: [30, 100]
					}
				}
			],
			tooltip: {
				trigger: 'item',
				backgroundColor: 'rgba(0, 0, 0, .6)',
				textStyle: {
					color: '#fff',
					fontSize: 12
				}
			},
			series: [
				{
					name: 'Hua Wei Mate 50',
					type: 'map',
					map: 'china',
					label: {
						show: true,
						color: 'rgb(249, 249, 249)',
						fontSize: 10
					},
					itemStyle: {
						areaColor: '#2f82ce',
						borderColor: '#0DAAC1'
					},
					data: mapData
				}
			]
		})
	}

	useEffect(() => {
		setLoading(true)
		sleep(2000).then(() => {
			setLoading(false)
			register()
		})
	}, [])
	return (
		<Card loading={loading} title="销售分布">
			<EChart height="600px" options={options} />
		</Card>
	)
}

export default Map
