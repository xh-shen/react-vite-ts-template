/*
 * @Author: shen
 * @Date: 2022-09-30 14:22:04
 * @LastEditors: shen
 * @LastEditTime: 2022-09-30 14:22:06
 * @Description:
 */
export const sleep = async (delay: number) => {
	return new Promise(resolve => setTimeout(resolve, delay))
}
