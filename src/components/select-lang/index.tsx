/*
 * @Author: shen
 * @Date: 2022-09-28 08:27:06
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:07:16
 * @Description:
 */
import { Dropdown, Menu } from 'antd'
import SvgIcon from '../svg-icon'
import type { FC } from 'react'

export interface SelectLangProps {
	className?: string
	language: LocaleType
	setLanguage: (language: LocaleType) => void
	onChange?: (language: LocaleType) => void
}

const SelectLang: FC<SelectLangProps> = ({ className, language, setLanguage, onChange }) => {
	const onItemClick = async (key: LocaleType) => {
		if (key === language) {
			return
		}
		await setLanguage(key)
		onChange?.(key)
	}
	const menu = (
		<Menu
			selectable
			style={{ minWidth: 160 }}
			defaultSelectedKeys={[language]}
			items={[
				{
					key: 'zh-cn',
					label: <span style={{ marginLeft: 8 }}>简体中文</span>,
					icon: '🇨🇳',
					onClick: () => onItemClick('zh-cn')
				},
				{
					key: 'en',
					label: <span style={{ marginLeft: 8 }}>English</span>,
					icon: '🇺🇸',
					onClick: () => onItemClick('en')
				}
			]}
		/>
	)

	return (
		<Dropdown overlay={menu} placement="bottomRight">
			<span className={className}>
				<SvgIcon name="lang-line" />
			</span>
		</Dropdown>
	)
}

export default SelectLang
