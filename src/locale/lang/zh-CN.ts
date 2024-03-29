/*
 * @Author: shen
 * @Date: 2022-09-26 14:08:22
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:42:37
 * @Description:
 */
export default {
	app: {
		notifyTitle: '提示',
		login: '登录',
		analysis: '分析页',
		workplace: '工作台',
		copyright: '© 2022 shene 开发完成 如有问题请使用QQ扫码加好友咨询'
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
	tabs: {
		more: '更多',
		closeCurrent: '关闭标签页',
		closeLeft: '关闭左侧标签页',
		closeRight: '关闭右侧标签页',
		closeOther: '关闭其它标签页',
		closeAll: '关闭所有标签页'
	},
	header: {
		menuSearch: '搜索菜单',
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
	},
	setting: {
		hint: '配置栏修改后会缓存到本地，如需清除，请手动重置配置',
		reset: '重置配置',
		resetHint: '重置配置成功',
		pageStyle: {
			title: '整体风格设置',
			lightMenu: '亮色菜单风格',
			darkMenu: '暗色菜单风格',
			darkLayout: '暗色布局风格',
			dark: '暗色风格'
		},
		themeColor: {
			title: '主题色',
			default: '系统默认',
			daybreakBlue: '拂晓蓝',
			dustRed: '薄暮',
			volcano: '火山',
			sunsetOrange: '日暮',
			cyan: '明青',
			polarGreen: '极光绿',
			geekBlue: '极客蓝',
			goldenPurple: '酱紫'
		},
		layout: {
			title: '导航模式',
			siderMenu: '侧边菜单布局',
			topMenu: '顶部菜单布局',
			mixinMenu: '混合菜单布局'
		},
		interfaceFunction: {
			title: '界面功能',
			contentWidth: '内容区域宽度',
			contentWidthFixed: '定宽',
			contentWidthFluid: '流式',
			fixedHeader: '固定顶栏',
			fixedSidebar: '固定侧边菜单',
			siderWidth: '侧边菜单宽度',
			accordionMenus: '手风琴菜单',
			splitMenus: '自动分割菜单',
			dragSidebar: '拖拽侧边菜单',
			collapseSidebar: '折叠侧边菜单',
			collapsePosition: '折叠按钮',
			collapsePositionTop: '顶部',
			collapsePositionBottom: '底部',
			collapsePositionNone: '不显示'
		},
		interfaceDisplay: {
			title: '界面显示',
			header: '顶栏',
			siderbar: '侧边菜单',
			breadcrumbs: '面包屑',
			breadcrumbIcon: '面包屑图标',
			logo: 'Logo',
			footer: '页脚',
			tabs: '标签页',
			fullContent: '全屏内容'
		},
		otherSettings: {
			title: '其他设置',
			darkMode: '暗色模式',
			colorWeak: '色弱模式',
			grayMode: '灰色模式'
		}
	}
}
