/*
 * @Author: shen
 * @Date: 2022-09-26 14:08:22
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 15:27:05
 * @Description:
 */
export default {
	app: {
		notifyTitle: '提示'
	},
	request: {
		200: '服务器成功返回请求的数据。',
		201: '新建或修改数据成功。',
		400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
		401: '用户没有权限（令牌、用户名、密码错误）。',
		403: '用户得到授权，但是访问是被禁止的。',
		404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
		406: '请求的格式不可得。',
		500: '服务器发生错误，请检查服务器。',
		502: '网关错误。',
		503: '服务不可用，服务器暂时过载或维护。',
		504: '网关超时。'
	},
	login: {
		confirm: '登录',
		reset: '重置'
	},
	tabs: {
		more: '更多',
		closeCurrent: '关闭当前',
		closeOther: '关闭其它',
		closeAll: '关闭所有'
	},
	header: {
		componentSize: '组件大小',
		language: '语言',
		theme: '主题',
		themeSetting: '主题设置',
		darkMode: '暗黑模式',
		lightMode: '浅色模式',
		fullScreen: '全屏',
		exitFullScreen: '退出全屏',
		personalData: '个人资料',
		changePassword: '修改密码',
		logout: '退出登录'
	}
}
