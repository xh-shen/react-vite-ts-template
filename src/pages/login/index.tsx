/*
 * @Author: shen
 * @Date: 2022-09-23 15:03:55
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:17:22
 * @Description:
 */
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { SelectLang } from '@/components'
import { useAppSetting } from '@/hooks'
import { useLocale, useAppContext } from '@/context'
import AccountForm from './components/AccountForm'
import QrCodeForm from './components/QrCodeForm'
import MobileForm from './components/MobileForm'
import './index.less'
import './lang'

import type { FC } from 'react'
import classNames from 'classnames'

const Login: FC = () => {
	const { t } = useTranslation()
	const { darkMode } = useAppSetting()
	const { getPrefixCls } = useAppContext()
	const [locale, setLocale] = useLocale()
	const prefixCls = getPrefixCls('login')

	const className = classNames(prefixCls, {
		[`${prefixCls}-dark`]: darkMode
	})
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
		<div className={className}>
			<div className={`${prefixCls}-container`}>
				<div className={`${prefixCls}-wrapper`}>
					<QrCodeForm />
					<div className={`${prefixCls}-form`}>
						<Tabs defaultActiveKey="account" size="large" items={items} />
						<div className={`${prefixCls}-tips`}>{t('login.tips')}</div>
					</div>
				</div>
				<div className={`${prefixCls}-lang`}>
					<SelectLang language={locale} setLanguage={setLocale} />
				</div>
				<div className={`${prefixCls}-copyright`}>{t('login.copyright')}</div>
			</div>
		</div>
	)
}

export default Login
