/*
 * @Author: shen
 * @Date: 2022-11-01 10:55:02
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 12:55:34
 * @Description:
 */
import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { useLocaleContext, useSizeContext, useThemeColorContext } from './context'

import moment from 'moment'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import 'moment/dist/locale/zh-cn'

import type { FC, ReactNode } from 'react'
import type { Locale } from 'antd/lib/locale-provider'

interface AntdProviderProps {
	children?: ReactNode
}

const languageToAntdMap: Record<string, Locale> = {
	en: enUS,
	'zh-cn': zhCN
}

const AntdProvider: FC<AntdProviderProps> = ({ children }) => {
	const size = useSizeContext()
	const locale = useLocaleContext()
	const themeColor = useThemeColorContext()
	useEffect(() => {
		ConfigProvider.config({
			theme: { primaryColor: themeColor }
		})
	}, [themeColor])
	useEffect(() => {
		moment.locale(locale)
	}, [])
	return (
		<ConfigProvider componentSize={size} locale={languageToAntdMap[locale]}>
			{children}
		</ConfigProvider>
	)
}

export default AntdProvider
