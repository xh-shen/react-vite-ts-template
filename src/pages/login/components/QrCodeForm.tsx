/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-10-06 21:25:47
 * @Description:
 */
import { useTranslation } from 'react-i18next'
import { usePrefixCls } from '@/hooks'
import qrcode from '@/assets/images/qq_qr.png'

import type { FC } from 'react'

const QrCodeForm: FC = () => {
	const { t } = useTranslation()
	const prefixCls = usePrefixCls('login-qrcode')

	return (
		<div className={prefixCls}>
			<div className={`${prefixCls}-wrapper`}>
				<div className={`${prefixCls}-title`}>{t('login.qrcode.title')}</div>
				<div className={`${prefixCls}-pic`}>
					<img src={qrcode} />
				</div>
				<div className={`${prefixCls}-tip`}>
					{t('login.qrcode.open')}
					<span> QQ </span>
					{t('login.qrcode.scan')}
				</div>
			</div>
		</div>
	)
}

export default QrCodeForm
