/*
 * @Author: shen
 * @Date: 2022-10-13 11:05:18
 * @LastEditors: shen
 * @LastEditTime: 2022-10-25 18:10:53
 * @Description:
 */
import { cloneElement } from 'react'
import { List, Switch, Tooltip, InputNumber, Select } from 'antd'
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
	const {
		contentWidth,
		layout,
		fixSiderbar,
		fixedHeader,
		siderCollapsed,
		siderWidth,
		collapsePosition,
		dragSidebar,
		accordionMenu,
		splitMenus,
		showSiderbar,
		showHeader,
		showCollapseButton,
		fullContent,
		setSettingValue
	} = useAppSetting()

	return (
		<List
			split={false}
			dataSource={[
				{
					title: t('setting.interfaceFunction.contentWidth'),
					action: (
						<Select
							size="small"
							value={contentWidth}
							style={{ width: 80 }}
							onChange={value => {
								setSettingValue('contentWidth', value)
							}}
						>
							{layout === 'top' ? (
								<Select.Option value="Fixed">{t('setting.interfaceFunction.contentWidthFixed')}</Select.Option>
							) : null}
							<Select.Option value="Fluid">{t('setting.interfaceFunction.contentWidthFluid')}</Select.Option>
						</Select>
					)
				},
				{
					title: t('setting.interfaceFunction.fixedHeader'),
					disabled: !showHeader || fullContent,
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
					disabled: layout === 'top' || !showSiderbar || fullContent,
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
					disabled: layout === 'top' || !showSiderbar || fullContent,
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
					title: t('setting.interfaceFunction.dragSidebar'),
					disabled: layout === 'top' || !!siderCollapsed || !showSiderbar || fullContent,
					action: (
						<Switch
							size="small"
							checked={!!dragSidebar}
							onChange={checked => {
								setSettingValue('dragSidebar', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.accordionMenus'),
					disabled: layout === 'top' || !!siderCollapsed || !showSiderbar || fullContent,
					action: (
						<Switch
							size="small"
							checked={!!accordionMenu}
							onChange={checked => {
								setSettingValue('accordionMenu', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.splitMenus'),
					disabled: layout !== 'mix' || !showSiderbar || fullContent,
					action: (
						<Switch
							size="small"
							checked={!!splitMenus}
							onChange={checked => {
								setSettingValue('splitMenus', checked)
							}}
						/>
					)
				},
				{
					title: t('setting.interfaceFunction.collapsePosition'),
					disabled: layout === 'top' || !showSiderbar || !showCollapseButton || fullContent,
					action: (
						<Select
							size="small"
							value={collapsePosition}
							style={{ width: 80 }}
							onChange={value => {
								setSettingValue('collapsePosition', value)
							}}
						>
							{!(layout === 'mix' && splitMenus) && (
								<Select.Option value="top">{t('setting.interfaceFunction.collapsePositionTop')}</Select.Option>
							)}
							<Select.Option value="bottom">{t('setting.interfaceFunction.collapsePositionBottom')}</Select.Option>
						</Select>
					)
				},
				{
					title: t('setting.interfaceFunction.siderWidth'),
					disabled: layout === 'top' || !!siderCollapsed || !showSiderbar || fullContent,
					action: (
						<InputNumber
							value={siderWidth}
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
