/*
 * @Author: shen
 * @Date: 2022-10-19 13:26:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-21 10:03:22
 * @Description:
 */

import * as echarts from 'echarts/core'

import { BarChart, LineChart, PieChart, MapChart, PictorialBarChart, RadarChart, ScatterChart } from 'echarts/charts'

import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	PolarComponent,
	AriaComponent,
	ParallelComponent,
	LegendComponent,
	RadarComponent,
	DatasetComponent,
	ToolboxComponent,
	DataZoomComponent,
	VisualMapComponent,
	TimelineComponent,
	CalendarComponent,
	GraphicComponent
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

import type { EChartsOption } from 'echarts'
import type { EChartsType } from 'echarts/core'

export type { EChartsOption, EChartsType }

echarts.use([
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	PolarComponent,
	AriaComponent,
	ParallelComponent,
	DatasetComponent,
	BarChart,
	LineChart,
	PieChart,
	MapChart,
	RadarChart,
	SVGRenderer,
	PictorialBarChart,
	RadarComponent,
	ToolboxComponent,
	DataZoomComponent,
	VisualMapComponent,
	TimelineComponent,
	CalendarComponent,
	GraphicComponent,
	ScatterChart
])

export const createInstance = (dom: HTMLElement) => {
	const instance: EChartsType = echarts.init(dom)
	return instance
}

export default echarts
