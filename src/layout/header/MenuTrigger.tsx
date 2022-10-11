/*
 * @Author: shen
 * @Date: 2022-10-10 21:05:47
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 22:29:06
 * @Description:
 */
import { SvgIcon } from '@/components'
import { usePrefixCls } from '@/hooks'
import { useAppDispatch, useAppSelector, setSiderCollapsed } from '@/store'
import type { FC } from 'react'
const MenuTrigger: FC = () => {
	const prefixCls = usePrefixCls('layout-header-collapsed')
	const siderCollapsed = useAppSelector(state => state.app.siderCollapsed)
	const dispatch = useAppDispatch()
	return (
		<span className={prefixCls} onClick={() => dispatch(setSiderCollapsed(!siderCollapsed))}>
			<SvgIcon rotate={15} name={siderCollapsed ? 'menu-unfold-line' : 'menu-fold-line'} />
		</span>
	)
}

export default MenuTrigger
