/*
 * @Author: shen
 * @Date: 2022-10-26 07:56:38
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 16:33:52
 * @Description:
 */
import { useState } from 'react'
import { usePrefixCls, rootPrefixCls } from '@/hooks'
import Portal from '../portal'
import SearchPopup from './SearchPopup'
import './index.less'
import type { FC, MouseEvent, KeyboardEvent } from 'react'
import type { PortalProps } from '../portal'
import type { SearchPopupProps } from './SearchPopup'
export interface SearchProps extends Omit<SearchPopupProps, 'prefixCls'> {
	open: boolean
	destroyOnClose?: boolean
	onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
	getContainer?: PortalProps['getContainer']
}

const CustomSearch: FC<SearchProps> = props => {
	const prefixCls = usePrefixCls('search')

	const { open, getContainer, destroyOnClose, afterOpenChange } = props

	const [animatedVisible, setAnimatedVisible] = useState(false)

	const internalAfterOpenChange: SearchPopupProps['afterOpenChange'] = nextVisible => {
		setAnimatedVisible(nextVisible)
		afterOpenChange?.(nextVisible)
	}

	if (!open && !animatedVisible && destroyOnClose) {
		return null
	}

	const sharedSearchProps = {
		...props,
		prefixCls,
		rootPrefixCls,
		afterOpenChange: internalAfterOpenChange
	}

	return (
		<Portal open={open || animatedVisible} autoDestroy={false} autoLock={open || animatedVisible} getContainer={getContainer}>
			<SearchPopup {...sharedSearchProps} />
		</Portal>
	)
}

export default CustomSearch
