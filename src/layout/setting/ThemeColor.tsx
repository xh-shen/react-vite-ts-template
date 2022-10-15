/*
 * @Author: shen
 * @Date: 2022-10-09 16:20:39
 * @LastEditors: shen
 * @LastEditTime: 2022-10-15 19:30:25
 * @Description:
 */
import { useAppSetting, usePrefixCls } from '@/hooks'
import { Tooltip, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { CheckOutlined } from '@ant-design/icons'
import config from '@/config'

import type { FC } from 'react'

const ThemeColor: FC = () => {
	const { t } = useTranslation()
	const prefixCls = usePrefixCls('layout-setting-theme-color')

	const { themeColor, setSettingValue } = useAppSetting()

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
	]
	return (
		<div className={prefixCls}>
			<Tooltip placement="top" title={t('setting.themeColor.default')}>
				<div
					className={`${prefixCls}-item`}
					onClick={() => setSettingValue('themeColor', config.themeColor)}
					style={{ backgroundColor: config.themeColor, marginRight: 0 }}
				>
					<CheckOutlined
						className={`${prefixCls}-item-select`}
						style={{ display: themeColor === config.themeColor ? 'block' : 'none' }}
					/>
				</div>
			</Tooltip>
			<Divider type="vertical" />
			{items.map(item => (
				<Tooltip key={item.key} placement="top" title={item.title}>
					<div
						className={`${prefixCls}-item`}
						onClick={() => setSettingValue('themeColor', item.color)}
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
