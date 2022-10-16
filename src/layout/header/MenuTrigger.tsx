/*
 * @Author: shen
 * @Date: 2022-10-10 21:05:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 15:47:54
 * @Description:
 */
import { SvgIcon } from '@/components'
import { useAppSetting, usePrefixCls } from '@/hooks'
import type { FC } from 'react'

const MenuTrigger: FC = () => {
	const prefixCls = usePrefixCls('layout-header-collapsed')
	const { siderCollapsed, setSettingValue } = useAppSetting()
	return (
		<span className={prefixCls} onClick={() => setSettingValue('siderCollapsed', !siderCollapsed, false)}>
			<SvgIcon rotate={15} name={siderCollapsed ? 'menu-unfold-line' : 'menu-fold-line'} />
		</span>
	)
}

export default MenuTrigger
