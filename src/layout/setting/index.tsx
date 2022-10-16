/*
 * @Author: shen
 * @Date: 2022-10-09 13:39:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 08:22:34
 * @Description:
 */
import { usePrefixCls, useAppSetting } from '@/hooks'
import { NotificationOutlined, SettingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Drawer, Divider, Alert, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import SettingBlock from './Block'
import ThemeColor from './ThemeColor'
import BlockCheckbox from './BlockCheckbox'
import InterfaceFunction from './InterfaceFunction'
import InterfaceDisplay from './InterfaceDisplay'

import type { FC, ReactNode, ReactElement } from 'react'
export type SettingItemProps = {
	title: ReactNode
	action: ReactElement
	disabled?: boolean
	disabledReason?: ReactNode
}

const LayoutSetting: FC = () => {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const prefixCls = usePrefixCls('layout-setting')
	const { pageStyle, layout, setSettingValue, resetSettingValues } = useAppSetting()

	return (
		<>
			<div className={`${prefixCls}-handle`} onClick={() => setOpen(true)}>
				<SettingOutlined />
			</div>
			<Drawer closable={false} open={open} width={300} onClose={() => setOpen(false)}>
				<div className={prefixCls}>
					<SettingBlock title={t('setting.pageStyle.title')}>
						<BlockCheckbox
							list={[
								{
									key: 'light',
									title: t('setting.pageStyle.lightMenu')
								},
								{
									key: 'dark',
									title: t('setting.pageStyle.darkMenu')
								},
								{
									key: 'layoutDark',
									title: t('setting.pageStyle.darkLayout')
								},
								{
									key: 'realDark',
									title: t('setting.pageStyle.dark')
								}
							]}
							value={pageStyle}
							prefixCls={prefixCls}
							onChange={value => setSettingValue('pageStyle', value)}
						/>
					</SettingBlock>
					<SettingBlock title={t('setting.themeColor.title')}>
						<ThemeColor />
					</SettingBlock>
					<SettingBlock title={t('setting.layout.title')}>
						<BlockCheckbox
							list={[
								{
									key: 'side',
									title: t('setting.layout.siderMenu')
								},
								{
									key: 'top',
									title: t('setting.layout.topMenu')
								},
								{
									key: 'mix',
									title: t('setting.layout.mixinMenu')
								}
							]}
							value={layout}
							prefixCls={prefixCls}
							onChange={value => setSettingValue('layout', value)}
						/>
					</SettingBlock>
					<Divider />
					<SettingBlock title={t('setting.interfaceFunction.title')}>
						<InterfaceFunction />
					</SettingBlock>
					<Divider />
					<SettingBlock title={t('setting.interfaceDisplay.title')}>
						<InterfaceDisplay />
					</SettingBlock>
					<Divider />
					<Alert
						type="warning"
						message={t('setting.hint')}
						icon={<NotificationOutlined />}
						showIcon
						style={{ marginBottom: 16 }}
					/>
					<Button
						block
						icon={<ReloadOutlined />}
						style={{ marginBottom: 24 }}
						onClick={() => {
							resetSettingValues()
							message.success(t('setting.resetHint'))
						}}
					>
						{t('setting.reset')}
					</Button>
				</div>
			</Drawer>
		</>
	)
}

export default LayoutSetting
