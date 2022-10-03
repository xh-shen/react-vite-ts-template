/*
 * @Author: shen
 * @Date: 2022-10-03 14:26:08
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:27:32
 * @Description:
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob('./**/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach(key => {
	if (key.includes('_')) {
		return
	}
	mockModules.push(...(modules[key] as any).default)
})

export function setupProdMockServer() {
	createProdMockServer(mockModules)
}
