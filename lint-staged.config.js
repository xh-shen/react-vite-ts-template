/*
 * @Author: shen
 * @Date: 2022-09-20 14:11:52
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 08:32:53
 * @Description:
 */
module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'*.{scss,less,styl}': [
		'stylelint --cache --fix "**/*.{less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/'
	]
}
