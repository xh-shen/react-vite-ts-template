/*
 * @Author: shen
 * @Date: 2022-09-23 15:03:55
 * @LastEditors: shen
 * @LastEditTime: 2022-10-06 21:20:49
 * @Description:
 */
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { SelectLang } from '@/components'
import { useLanguage, usePrefixCls } from '@/hooks'
import AccountForm from './components/AccountForm'
import QrCodeForm from './components/QrCodeForm'
import MobileForm from './components/MobileForm'
import './index.less'
import './lang'

import type { FC } from 'react'

const Login: FC = () => {
	const { t } = useTranslation()
	const [language, setLanguage] = useLanguage()
	const prefixCls = usePrefixCls('login')

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
		<div className={prefixCls}>
			<div className={`${prefixCls}-container`}>
				<div className={`${prefixCls}-wrapper`}>
					<QrCodeForm />
					<div className={`${prefixCls}-form`}>
						<Tabs defaultActiveKey="account" size="large" items={items} />
						<div className={`${prefixCls}-tips`}>{t('login.tips')}</div>
					</div>
				</div>
				<div className={`${prefixCls}-lang`}>
					<SelectLang language={language} setLanguage={setLanguage} />
				</div>
				<div className={`${prefixCls}-copyright`}>{t('login.copyright')}</div>
			</div>
		</div>
	)
}

export default Login
