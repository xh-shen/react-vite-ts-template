/*
 * @Author: shen
 * @Date: 2022-10-13 11:05:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-20 09:38:07
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
		showBreadcrumbs,
		showBreadcrumbIcon,
		showHeader,
		showFooter,
		showLogo,
		showSiderbar,
		fullContent,
		collapsePosition,
		showCollapseButton,
		showTabs,
		layout,
		setSettingValue
	} = useAppSetting()

	return (
		<List
			split={false}
			dataSource={[
				{
					title: t('setting.interfaceDisplay.header'),
					disabled: fullContent,
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
					disabled: layout === 'top' || fullContent,
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
					title: t('setting.interfaceDisplay.footer'),
					disabled: fullContent,
					action: (
						<Switch
							size="small"
							checked={!!showFooter}
							onChange={checked => {
								setSettingValue('showFooter', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.tabs'),
					action: (
						<Switch
							size="small"
							checked={!!showTabs}
							onChange={checked => {
								setSettingValue('showTabs', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.breadcrumbs'),
					disabled: fullContent || !showHeader,
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
					title: t('setting.interfaceDisplay.breadcrumbIcon'),
					disabled: fullContent || !showHeader || !showBreadcrumbs,
					action: (
						<Switch
							size="small"
							checked={!!showBreadcrumbIcon}
							onChange={checked => {
								setSettingValue('showBreadcrumbIcon', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceDisplay.logo'),
					disabled: fullContent || (!showHeader && layout !== 'side') || (!showSiderbar && layout === 'side'),
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
					disabled:
						fullContent || (!showHeader && collapsePosition === 'top') || (!showSiderbar && collapsePosition === 'bottom'),
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
				}
			]}
			renderItem={renderLayoutSettingItem}
		/>
	)
}

export default InterfaceDisplay
