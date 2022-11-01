/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 12:29:13
 * @Description:
 */
import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCountdown } from '@/hooks'
import { useAppDispatch, fetchLogin } from '@/store'
import { PHONE_REGEXP } from '@/utils'
import { useAppContext } from '@/context'

import type { FC } from 'react'
import type { LoginParams } from '@/interfaces'

const MobileForm: FC = () => {
	const [loading, setLoading] = useState(false)
	const { getPrefixCls } = useAppContext()
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const prefixCls = getPrefixCls('login-form')
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

	return (
		<div className={`${prefixCls}-wrapper`}>
			<Form
				form={form}
				name="mobileForm"
				autoComplete="off"
				initialValues={{
					phone: '13000000000',
					code: '0000'
				}}
				onFinish={onFinish}
			>
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
							<span className={`${prefixCls}-verify`} onClick={onCodeClick}>
								{!isStart ? t('login.button.code') : `${currentCount} ${t('login.button.try')}`}
							</span>
						}
					/>
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

export default MobileForm
