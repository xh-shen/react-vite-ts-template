/*
 * @Author: shen
 * @Date: 2022-09-23 16:19:32
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 09:09:27
 * @Description:
 */
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

import type { FC } from 'react'

const AccountForm: FC = () => {
	const [loading] = useState(false)

	const onFinish = (values: any) => {
		console.log('Success:', values)
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
