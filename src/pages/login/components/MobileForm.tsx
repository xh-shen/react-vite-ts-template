/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 13:46:43
 * @Description:
 */
import { useState, useEffect, useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLanguage, useCountdown } from '@/hooks'
import { useAppDispatch, fetchLogin } from '@/store'
import { PHONE_REGEXP } from '@/utils'

import type { FC } from 'react'
import type { LoginParams } from '@/interfaces'

const MobileForm: FC = () => {
	const [loading, setLoading] = useState(false)
	const [language] = useLanguage()
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const { currentCount, start, isStart } = useCountdown(60)

	const onFinish = async (values: LoginParams) => {
		setLoading(true)
		try {
			await dispatch(fetchLogin(values))
			navigate({ pathname: '/' }, { replace: true })
		} finally {
			setLoading(false)
		}
	}

	const hasFieldError = useCallback(() => {
		const fieldsError = form.getFieldsError()
		return fieldsError.some(field => field.errors.length > 0)
	}, [])

	const onCodeClick = async () => {
		try {
			await form.validateFields(['phone'])
			if (isStart) {
				return
			}
			start()
		} catch (error) {
			// TODO
		}
	}

	useEffect(() => {
		const hasError = hasFieldError()
		if (hasError) {
			form.validateFields()
		}
	}, [language])

	return (
		<div className="login-form-wrapper">
			<Form form={form} name="mobileForm" autoComplete="off" onFinish={onFinish}>
				<Form.Item
					name="phone"
					rules={[
						{ required: true, message: t('login.rule.phone') },
						{
							required: false,
							pattern: PHONE_REGEXP,
							message: t('login.rule.phoneReg')
						}
					]}
				>
					<Input
						prefix={<span style={{ marginRight: 10, color: 'rgba(22, 26, 35, 0.55)' }}>+86</span>}
						allowClear
						placeholder={t('login.placeholder.phone')}
					/>
				</Form.Item>
				<Form.Item name="code" rules={[{ required: true, message: t('login.rule.code') }]}>
					<Input
						placeholder={t('login.placeholder.code')}
						maxLength={4}
						suffix={
							<span className="login-verify-btn" onClick={onCodeClick}>
								{!isStart ? t('login.button.code') : `${currentCount} ${t('login.button.try')}`}
							</span>
						}
					/>
				</Form.Item>
				<Form.Item className="login-form-btn">
					<Button type="primary" size="large" block htmlType="submit" loading={loading}>
						{t('login.button.confirm')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default MobileForm
