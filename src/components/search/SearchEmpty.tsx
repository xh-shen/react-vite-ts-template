/*
 * @Author: shen
 * @Date: 2022-10-27 09:12:36
 * @LastEditors: shen
 * @LastEditTime: 2022-10-27 09:14:28
 * @Description:
 */
import { useTranslation } from 'react-i18next'
import type { FC } from 'react'

interface SearchEmptyProps {
	prefixCls?: string
}

const SearchEmpty: FC<SearchEmptyProps> = ({ prefixCls }) => {
	const { t } = useTranslation()
	return <div className={`${prefixCls}-empty`}>{t('components.search.empty')}</div>
}

export default SearchEmpty
