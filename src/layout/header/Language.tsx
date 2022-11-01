/*
 * @Author: shen
 * @Date: 2022-10-09 09:43:35
 * @LastEditors: shen
 * @LastEditTime: 2022-11-01 10:06:55
 * @Description:
 */
import { SelectLang } from '@/components'

import type { FC } from 'react'
import { useAppContext, useLocale } from '@/context'
const Language: FC = () => {
	const { getPrefixCls } = useAppContext()
	const [locale, setLocale] = useLocale()
	const prefixCls = getPrefixCls('layout-action')
	return <SelectLang className={prefixCls} language={locale} setLanguage={setLocale} />
}

export default Language
