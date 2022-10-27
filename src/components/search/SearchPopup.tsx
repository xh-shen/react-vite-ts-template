/*
 * @Author: shen
 * @Date: 2022-10-26 09:33:13
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 10:31:19
 * @Description:
 */
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import SearchPanel from './SearchPanel'

import type { CSSProperties } from 'react'
import type { SearchPanelProps } from './SearchPanel'

export interface SearchPopupProps extends Omit<SearchPanelProps, 'prefixCls'> {
	prefixCls?: string
	rootPrefixCls?: string
	width?: number | string
	maskClassName?: string
	maskStyle?: CSSProperties
	afterOpenChange?: (open: boolean) => void
}

export default function CustomSearchPopup(props: SearchPopupProps) {
	const { prefixCls, rootPrefixCls, maskClassName, maskStyle, open, width = 560, onClose, afterOpenChange } = props
	const maskRef = useRef(null)
	const panelRef = useRef(null)

	return (
		<div className={prefixCls}>
			<CSSTransition
				key="mask"
				in={open}
				nodeRef={maskRef}
				timeout={500}
				appear
				mountOnEnter
				unmountOnExit
				classNames={`${rootPrefixCls}-fade`}
			>
				<div className={classNames(`${prefixCls}-mask`, maskClassName)} style={maskStyle} ref={maskRef} onClick={onClose} />
			</CSSTransition>
			<div className={`${prefixCls}-wrapper`}>
				<CSSTransition
					key="panel"
					in={open}
					nodeRef={panelRef}
					timeout={500}
					mountOnEnter
					appear
					classNames={`${rootPrefixCls}-zoom`}
					onExited={() => {
						afterOpenChange?.(false)
					}}
					onEntered={() => {
						afterOpenChange?.(true)
					}}
				>
					<div className={`${prefixCls}-content`} ref={panelRef} style={{ width: width }}>
						<SearchPanel {...props}></SearchPanel>
					</div>
				</CSSTransition>
			</div>
		</div>
	)
}
