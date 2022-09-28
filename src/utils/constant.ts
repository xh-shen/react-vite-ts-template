/*
 * @Author: shen
 * @Date: 2022-05-29 08:04:18
 * @LastEditors: shen
 * @LastEditTime: 2022-09-28 14:19:22
 * @Description:
 */
export const KEY_RREFIX = 'shene'
export const TOKEN_KEY = `${KEY_RREFIX}_token`
export const USER_INFO_KEY = `${KEY_RREFIX}_user_info`
export const THEME_COLOR_KEY = `${KEY_RREFIX}_theme_color`
export const LANG_KEY = `${KEY_RREFIX}_lang`

export const PHONE_REGEXP =
	/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/
export const IDCARD_REGEXP = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
export const CARDNUMBER_REGEXP = /^\d+$|^\d+[.]?\d+$/
