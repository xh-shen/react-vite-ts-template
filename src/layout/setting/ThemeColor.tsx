/*
 * @Author: shen
 * @Date: 2022-10-09 16:20:39
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 13:16:53
 * @Description:
 */
import { Tooltip, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { CheckOutlined } from '@ant-design/icons'
import setting from '@/defaultSetting'

import type { FC } from 'react'
import { useAppContext, useThemeColor } from '@/context'

const ThemeColor: FC = () => {
	const { t } = useTranslation()
	const { getPrefixCls } = useAppContext()
	const prefixCls = getPrefixCls('layout-setting-theme-color')
	const [themeColor, { updateThemeColor }] = useThemeColor()

	const items = [
		{
			key: 'daybreakBlue',
			title: t('setting.themeColor.daybreakBlue'),
			color: 'rgb(24, 144, 255)'
		},
		{
			key: 'dustRed',
			title: t('setting.themeColor.dustRed'),
			color: 'rgb(245, 34, 45)'
		},
		{
			key: 'volcano',
			title: t('setting.themeColor.volcano'),
			color: 'rgb(250, 84, 28)'
		},
		{
			key: 'sunsetOrange',
			title: t('setting.themeColor.sunsetOrange'),
			color: 'rgb(250, 173, 20)'
		},
		{
			key: 'cyan',
			title: t('setting.themeColor.cyan'),
			color: 'rgb(19, 194, 194)'
		},
		{
			key: 'polarGreen',
			title: t('setting.themeColor.polarGreen'),
			color: 'rgb(82, 196, 26)'
		},
		{
			key: 'geekBlue',
			title: t('setting.themeColor.geekBlue'),
			color: 'rgb(47, 84, 235)'
		},
		{
			key: 'goldenPurple',
			title: t('setting.themeColor.goldenPurple'),
			color: 'rgb(114, 46, 209)'
		}
	].filter(item => item.color !== setting.themeColor)
	return (
		<div className={prefixCls}>
			<Tooltip placement="top" title={t('setting.themeColor.default')}>
				<div
					className={`${prefixCls}-item`}
					onClick={() => updateThemeColor(setting.themeColor)}
					style={{ backgroundColor: setting.themeColor, marginRight: 0 }}
				>
					<CheckOutlined
						className={`${prefixCls}-item-select`}
						style={{ display: themeColor === setting.themeColor ? 'block' : 'none' }}
					/>
				</div>
			</Tooltip>
			<Divider type="vertical" />
			{items.map(item => (
				<Tooltip key={item.key} placement="top" title={item.title}>
					<div
						className={`${prefixCls}-item`}
						onClick={() => updateThemeColor(item.color)}
						style={{ backgroundColor: item.color }}
					>
						<CheckOutlined
							className={`${prefixCls}-item-select`}
							style={{ display: themeColor === item.color ? 'block' : 'none' }}
						/>
					</div>
				</Tooltip>
			))}
		</div>
	)
}

export default ThemeColor
