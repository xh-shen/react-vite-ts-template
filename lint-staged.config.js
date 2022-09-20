/*
 * @Author: shen
 * @Date: 2022-09-20 14:11:52
 * @LastEditors: shen
 * @LastEditTime: 2022-09-20 14:12:00
 * @Description:
 */
module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'*.{scss,less,styl}': ['stylelint --fix', 'prettier --write']
}
