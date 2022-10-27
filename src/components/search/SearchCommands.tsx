/*
 * @Author: shen
 * @Date: 2022-10-27 13:10:23
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 13:14:38
 * @Description:
 */
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import SvgIcon from '../svg-icon'

interface SearchCommandsProps {
	prefixCls?: string
}
const SearchCommands: FC<SearchCommandsProps> = ({ prefixCls }) => {
	const { t } = useTranslation()
	return (
		<div className={`${prefixCls}-commands`}>
			<div className={`${prefixCls}-commands-item`}>
				<SvgIcon className={`${prefixCls}-commands-item-key`} name="enter" />
				<span className={`${prefixCls}-commands-item-label`}>{t('components.search.enter')}</span>
			</div>
			<div className={`${prefixCls}-commands-item`}>
				<SvgIcon className={`${prefixCls}-commands-item-key`} name="arrow-down" />
				<SvgIcon className={`${prefixCls}-commands-item-key`} name="arrow-up" />
				<span className={`${prefixCls}-commands-item-label`}>{t('components.search.arrow')}</span>
			</div>
			<div className={`${prefixCls}-commands-item`}>
				<SvgIcon className={`${prefixCls}-commands-item-key`} name="escape" />
				<span className={`${prefixCls}-commands-item-label`}>{t('components.search.esc')}</span>
			</div>
		</div>
	)
}

export default SearchCommands
