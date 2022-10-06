/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-10-06 21:22:33
 * @Description:
 */
import { useEffect, useState, useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLanguage, usePrefixCls } from '@/hooks'
import { useAppDispatch, fetchLogin } from '@/store'
import { useNavigate } from 'react-router-dom'
import type { FC } from 'react'
import type { LoginParams } from '@/interfaces'

const AccountForm: FC = () => {
	const [loading, setLoading] = useState(false)
	const [language] = useLanguage()
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const prefixCls = usePrefixCls('login-form')
	const { t } = useTranslation()

	const onFinish = async (values: LoginParams) => {
		setLoading(true)
		try {
			await dispatch(fetchLogin(values)).unwrap()
			navigate({ pathname: '/' }, { replace: true })
		} finally {
			setLoading(false)
		}
	}

	const hasFieldError = useCallback(() => {
		const fieldsError = form.getFieldsError()
		return fieldsError.some(field => field.errors.length > 0)
	}, [])

	useEffect(() => {
		const hasError = hasFieldError()
		if (hasError) {
			form.validateFields()
		}
	}, [language])

	return (
		<div className={`${prefixCls}-wrapper`}>
			<Form
				form={form}
				name="accountForm"
				autoComplete="off"
				initialValues={{
					username: 'shene',
					password: '123456'
				}}
				onFinish={onFinish}
			>
				<Form.Item name="username" rules={[{ required: true, message: t('login.rule.username') }]}>
					<Input allowClear placeholder={t('login.placeholder.username')} />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: t('login.rule.password') }]}>
					<Input.Password autoComplete="new-password" allowClear placeholder={t('login.placeholder.password')} />
				</Form.Item>
				<Form.Item className={`${prefixCls}-btn`}>
					<Button type="primary" size="large" block htmlType="submit" loading={loading}>
						{t('login.button.confirm')}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AccountForm
