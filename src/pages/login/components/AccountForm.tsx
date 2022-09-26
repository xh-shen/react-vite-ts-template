/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 10:05:29
 * @Description:
 */
import { useState } from 'react'
import { Button, Form, Input, notification } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { login } from '@/api/user'
import type { FC } from 'react'

interface LoginForm {
	username: string
	password: string
}

const AccountForm: FC = () => {
	const [loading, setLoading] = useState(false)

	const onFinish = async (values: LoginForm) => {
		setLoading(true)
		try {
			const { code, data, msg } = await login<LoginForm>(values)
			if (code === 200) {
				console.log(data)
				notification.success({
					message: '提示',
					description: msg
				})
			}
		} finally {
			setLoading(false)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<Form
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			size="large"
			autoComplete="off"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="用户名：admin" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button onClick={() => {}} icon={<CloseCircleOutlined />}>
					重置
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					登录
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AccountForm
