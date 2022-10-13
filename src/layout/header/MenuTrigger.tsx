/*
 * @Author: shen
 * @Date: 2022-10-10 21:05:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-13 21:45:30
 * @Description:
 */
import { SvgIcon } from '@/components'
import { useAppSetting, usePrefixCls } from '@/hooks'
import { useAppDispatch, setSiderCollapsed } from '@/store'
import type { FC } from 'react'
const MenuTrigger: FC = () => {
	const prefixCls = usePrefixCls('layout-header-collapsed')
	const { siderCollapsed } = useAppSetting()
	const dispatch = useAppDispatch()
	return (
		<span className={prefixCls} onClick={() => dispatch(setSiderCollapsed(!siderCollapsed))}>
			<SvgIcon rotate={15} name={siderCollapsed ? 'menu-unfold-line' : 'menu-fold-line'} />
		</span>
	)
}

export default MenuTrigger
