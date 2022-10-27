/*
 * @Author: shen
 * @Date: 2022-10-06 19:59:35
 * @LastEditors: shen
 * @LastEditTime: 2022-10-26 15:06:33
 * @Description:
 */

import config from '@/config'

const getPrefixCls = (namespace: string, block: string) => {
	let cls = `${namespace}-${block}`
	return cls
}

export const usePrefixCls = (block: string) => {
	const { namespace } = config
	return getPrefixCls(namespace, block)
}

export const rootPrefixCls = config.namespace
