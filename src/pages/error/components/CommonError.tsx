/*
 * @Author: shen
 * @Date: 2022-10-13 08:27:07
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 08:32:56
 * @Description:
 */
import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { FC } from 'react'
import { ResultStatusType } from 'antd/lib/result'

interface CommonErrorProps {
	status: ResultStatusType
	title: string
	subTitle: string
}

const CommonError: FC<CommonErrorProps> = ({ status, title, subTitle }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	return (
		<Result
			status={status}
			title={title}
			subTitle={subTitle}
			extra={
				<Button type="primary" onClick={() => navigate({ pathname: '/' }, { replace: true })}>
					{t('error.backHome')}
				</Button>
			}
		/>
	)
}

export default CommonError
