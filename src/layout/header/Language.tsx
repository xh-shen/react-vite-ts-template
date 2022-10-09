/*
 * @Author: shen
 * @Date: 2022-10-09 09:43:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 10:13:03
 * @Description:
 */
import { usePrefixCls, useLanguage } from '@/hooks'
import { SelectLang } from '@/components'

import type { FC } from 'react'
const Language: FC = () => {
	const prefixCls = usePrefixCls('layout-action')
	const [language, setLanguage] = useLanguage()
	return <SelectLang className={prefixCls} language={language} setLanguage={setLanguage} />
}

export default Language
