/*
 * @Author: shen
 * @Date: 2022-09-23 15:03:55
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 13:33:37
 * @Description:
 */
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { SelectLang } from '@/components'
import { useLanguage } from '@/hooks'
import AccountForm from './components/AccountForm'
import QrCodeForm from './components/QrCodeForm'
import MobileForm from './components/MobileForm'
import './index.less'
import './lang'

import type { FC } from 'react'

const Login: FC = () => {
	const { t } = useTranslation()
	const [language, setLanguage] = useLanguage()

	const items = [
		{
			label: t('login.tabs.account'),
			key: 'account',
			children: <AccountForm />
		},
		{
			label: t('login.tabs.mobile'),
			key: 'mobile',
			children: <MobileForm />
		}
	]

	return (
		<div className="login">
			<div className="login-container">
				<div className="login-wrapper">
					<QrCodeForm />
					<div className="login-form">
						<Tabs defaultActiveKey="account" size="large" items={items} />
						<div className="login-tips">{t('login.tips')}</div>
					</div>
				</div>
				<div className="login-lang">
					<SelectLang language={language} setLanguage={setLanguage} />
				</div>
				<div className="login-copyright">{t('login.copyright')}</div>
			</div>
		</div>
	)
}

export default Login
