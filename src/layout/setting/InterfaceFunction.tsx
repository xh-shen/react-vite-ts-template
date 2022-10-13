/*
 * @Author: shen
 * @Date: 2022-10-13 11:05:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 16:27:27
 * @Description:
 */
import { cloneElement } from 'react'
import { List, Switch, Tooltip, InputNumber } from 'antd'
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

const InterfaceFunction: FC = () => {
	const { t } = useTranslation()
	const { layout, fixSiderbar, fixedHeader, siderCollapsed, siderWidth, setSettingValue } = useAppSetting()

	return (
		<List
			split={false}
			dataSource={[
				{
					title: t('setting.interfaceFunction.fixedHeader'),
					action: (
						<Switch
							size="small"
							checked={!!fixedHeader}
							onChange={checked => {
								setSettingValue('fixedHeader', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.fixedSidebar'),
					disabled: layout === 'top',
					disabledReason: t('setting.interfaceFunction.fixedSidebarReason'),
					action: (
						<Switch
							size="small"
							checked={!!fixSiderbar}
							onChange={checked => {
								setSettingValue('fixSiderbar', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.collapseSidebar'),
					disabled: layout === 'top',
					disabledReason: t('setting.interfaceFunction.fixedSidebarReason'),
					action: (
						<Switch
							size="small"
							checked={!!siderCollapsed}
							onChange={checked => {
								setSettingValue('siderCollapsed', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.siderWidth'),
					disabled: layout === 'top',
					disabledReason: t('setting.interfaceFunction.fixedSidebarReason'),
					action: (
						<InputNumber
							defaultValue={siderWidth}
							min={120}
							style={{ width: 80 }}
							size="small"
							formatter={value => `${value}px`}
							onChange={value => setSettingValue('siderWidth', value)}
						/>
					)
				}
			]}
			renderItem={renderLayoutSettingItem}
		/>
	)
}

export default InterfaceFunction