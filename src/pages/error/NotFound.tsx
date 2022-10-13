/*
 * @Author: shen
 * @Date: 2022-09-30 08:42:11
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 08:31:56
 * @Description:
 */
import { useTranslation } from 'react-i18next'
import './lang'

import type { FC } from 'react'
import CommonError from './components/CommonError'

const NotFound: FC = () => {
	const { t } = useTranslation()

	return <CommonError status="404" title="404" subTitle={t('error.notFound')} />
}

export default NotFound
