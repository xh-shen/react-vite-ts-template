/*
 * @Author: shen
 * @Date: 2022-10-13 11:05:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-15 22:29:44
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
	const {
		colorWeak,
		grayMode,
		showBreadcrumbs,
		showHeader,
		showLogo,
		showSiderbar,
		fullContent,
		showCollapseButton,
		setSettingValue
	} = useAppSetting()

	return (
		<List
			split={false}
			dataSource={[
				{
					title: t('setting.interfaceDisplay.header'),
					action: (
						<Switch
							size="small"
							checked={!!showHeader}
							onChange={checked => {
								setSettingValue('showHeader', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.siderbar'),
					action: (
						<Switch
							size="small"
							checked={!!showSiderbar}
							onChange={checked => {
								setSettingValue('showSiderbar', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.breadcrumbs'),
					action: (
						<Switch
							size="small"
							checked={!!showBreadcrumbs}
							onChange={checked => {
								setSettingValue('showBreadcrumbs', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.logo'),
					action: (
						<Switch
							size="small"
							checked={!!showLogo}
							onChange={checked => {
								setSettingValue('showLogo', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.collapsePosition'),
					action: (
						<Switch
							size="small"
							checked={!!showCollapseButton}
							onChange={checked => {
								setSettingValue('showCollapseButton', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.fullContent'),
					action: (
						<Switch
							size="small"
							checked={!!fullContent}
							onChange={checked => {
								setSettingValue('fullContent', checked)
							}}
						/>
					)
				},
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
