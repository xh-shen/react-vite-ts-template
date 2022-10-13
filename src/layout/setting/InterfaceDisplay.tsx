/*
 * @Author: shen
 * @Date: 2022-10-13 11:05:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 20:55:45
 * @Description:
 */
import { cloneElement } from 'react'
import { List, Switch, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAppSetting } from '@/hooks'

import type { FC } from 'react'
import type { SettingItemProps } from '.'

export const renderLayoutSettingItem = (item: SettingItemProps) => {
	const action = cloneElement(item.action, {
		disabled: item.disabled
	})
	return (
		<Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
			<List.Item actions={[action]}>
				<span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
			</List.Item>
		</Tooltip>
	)
}

const InterfaceDisplay: FC = () => {
	const { t } = useTranslation()
	const { colorWeak, grayMode, setSettingValue } = useAppSetting()

	return (
		<List
			split={false}
			dataSource={[
				{
					title: t('setting.interfaceDisplay.grayMode'),
					action: (
						<Switch
							size="small"
							checked={!!grayMode}
							onChange={checked => {
								setSettingValue('grayMode', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.colorWeak'),
					action: (
						<Switch
							size="small"
							checked={!!colorWeak}
							onChange={checked => {
								setSettingValue('colorWeak', checked)
							}}
						/>
					)
				}
			]}
			renderItem={renderLayoutSettingItem}
		/>
	)
}

export default InterfaceDisplay
