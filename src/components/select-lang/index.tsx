/*
 * @Author: shen
 * @Date: 2022-09-28 08:27:06
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 09:45:08
 * @Description:
 */
import { Dropdown, Menu } from 'antd'
import SvgIcon from '../svg-icon'
import type { FC } from 'react'

// const list = [
// 	{
// 		lang: 'zh-cn',
// 		label: '简体中文',
// 		icon: '🇨🇳'
// 	},
// 	{
// 		lang: 'en',
// 		label: 'English',
// 		icon: '🇺🇸'
// 	}
// ]

export interface SelectLangProps {
	language: string
	setLanguage: (language: string) => void
}

const SelectLang: FC<SelectLangProps> = ({ language, setLanguage }) => {
	const menu = (
		<Menu
			style={{ minWidth: 120 }}
			items={[
				{
					key: '1',
					label: <span style={{ marginLeft: 5 }}>简体中文</span>,
					icon: '🇨🇳',
					onClick: () => setLanguage('zh-CN'),
					disabled: language === 'zh-CN'
				},
				{
					key: '2',
					label: <span style={{ marginLeft: 5 }}>English</span>,
					icon: '🇺🇸',
					onClick: () => setLanguage('en'),
					disabled: language === 'en'
				}
			]}
		/>
	)

	return (
		<Dropdown overlay={menu} placement="bottomRight">
			<span>
				<SvgIcon name="lang-line" />
			</span>
		</Dropdown>
	)
}

export default SelectLang
