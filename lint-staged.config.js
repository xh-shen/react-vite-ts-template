/*
 * @Author: shen
 * @Date: 2022-09-20 14:11:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 08:58:16
 * @Description:
 */
module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'*.{scss,less,styl}': ['stylelint  --fix', 'prettier --write']
}
