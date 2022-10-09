/*
 * @Author: shen
 * @Date: 2022-10-09 13:39:01
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 16:51:09
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { SettingOutlined } from '@ant-design/icons'
import { Drawer, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'
import SettingBlock from './Block'
import PageStyle from './PageStyle'
import ThemeColor from './ThemeColor'
import NavigationMode from './NavigationMode'
const LayoutSetting: FC = () => {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const prefixCls = usePrefixCls('layout-setting')

	const onOpen = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<>
			<div className={`${prefixCls}-handle`} onClick={onOpen}>
				<SettingOutlined />
			</div>
			<Drawer closable={false} open={open} width={300} onClose={onClose}>
				<div className={prefixCls}>
					<SettingBlock title={t('setting.pageStyle.title')}>
						<PageStyle />
					</SettingBlock>
					<SettingBlock title={t('setting.themeColor.title')}>
						<ThemeColor />
					</SettingBlock>
					<Divider />
					<SettingBlock title={t('setting.navigationMode.title')}>
						<NavigationMode />
					</SettingBlock>
				</div>
			</Drawer>
		</>
	)
}

export default LayoutSetting
