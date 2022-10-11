/*
 * @Author: shen
 * @Date: 2022-10-10 16:50:23
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 20:55:03
 * @Description:
 */
import { SvgIcon } from '@/components'
import { useFullscreen } from 'ahooks'
import { usePrefixCls } from '@/hooks'
import type { FC } from 'react'
const Fullscreen: FC = () => {
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.body)
	const prefixCls = usePrefixCls('layout-action')
	return (
		<span className={prefixCls} onClick={toggleFullscreen}>
			<SvgIcon name={isFullscreen ? 'exit-full-line' : 'full-line'} />
		</span>
	)
}

export default Fullscreen
