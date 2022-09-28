/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-09-27 14:32:33
 * @Description:
 */
import { useTranslation } from 'react-i18next'
import qrcode from '@/assets/images/qq_qr.png'

import type { FC } from 'react'

const QrCodeForm: FC = () => {
	const { t } = useTranslation()

	return (
		<div className="login-qrcode">
			<div className="login-qrcode-wrapper">
				<div className="login-qrcode-title">{t('login.qrcode.title')}</div>
				<div className="login-qrcode-pic">
					<img src={qrcode} />
				</div>
				<div className="login-qrcode-tip">
					{t('login.qrcode.open')}
					<span> QQ </span>
					{t('login.qrcode.scan')}
				</div>
			</div>
		</div>
	)
}

export default QrCodeForm
