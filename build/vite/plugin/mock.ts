/*
 * @Author: shen
 * @Date: 2022-10-03 14:24:53
 * @LastEditors: shen
 * @LastEditTime: 2022-10-03 14:25:14
 * @Description:
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean) {
	return viteMockServe({
		ignore: /^_/,
		mockPath: 'mock',
		localEnabled: !isBuild,
		prodEnabled: isBuild,
		injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
	})
}
