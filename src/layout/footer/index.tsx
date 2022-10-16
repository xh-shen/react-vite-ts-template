/*
 * @Author: shen
 * @Date: 2022-10-16 16:57:58
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 17:14:14
 * @Description:
 */
import { useAppSetting, usePrefixCls } from '@/hooks'
import { Layout } from 'antd'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

const { Footer } = Layout

const LayoutFooter: FC = () => {
	const { t } = useTranslation()
	const { footerHeight } = useAppSetting()
	const prefixCls = usePrefixCls('layout-footer')
	return (
		<Footer className={prefixCls} style={{ height: footerHeight + 'px' }}>
			<div className={`${prefixCls}-wrapper`}>
				<span>{t('app.copyright')}</span>
			</div>
		</Footer>
	)
}

export default LayoutFooter
