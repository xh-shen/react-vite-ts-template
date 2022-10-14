/*
 * @Author: shen
 * @Date: 2022-09-28 08:27:06
 * @LastEditors: shen
 * @LastEditTime: 2022-10-14 16:40:52
 * @Description:
 */
import { Dropdown, Menu } from 'antd'
import SvgIcon from '../svg-icon'
import type { FC } from 'react'

export interface SelectLangProps {
	className?: string
	language: string
	setLanguage: (language: string) => void
	onChange?: (language: string) => void
}

const SelectLang: FC<SelectLangProps> = ({ className, language, setLanguage, onChange }) => {
	const onItemClick = async (key: string) => {
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
					key: 'zh-CN',
					label: <span style={{ marginLeft: 8 }}>简体中文</span>,
					icon: '🇨🇳',
					onClick: () => onItemClick('zh-CN')
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
