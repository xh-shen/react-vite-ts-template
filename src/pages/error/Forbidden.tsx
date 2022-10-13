/*
 * @Author: shen
 * @Date: 2022-10-12 08:38:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 08:43:44
 * @Description:
 */
import { useTranslation } from 'react-i18next'
import CommonError from './components/CommonError'

import './lang'

import type { FC } from 'react'

const Forbidden: FC = () => {
	const { t } = useTranslation()
	return <CommonError status="403" title="403" subTitle={t('error.forbidden')} />
}

export default Forbidden
