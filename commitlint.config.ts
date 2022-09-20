/*
 * @Author: shen
 * @Date: 2022-09-20 10:54:13
 * @LastEditors: shen
 * @LastEditTime: 2022-09-20 10:54:37
 * @Description:
 */
export default {
	rules: {
		/**
		 * type[scope]: [function] description
		 *
		 * ^^^^^^^^^^^^^^ empty line.
		 * - Something here
		 */
		'body-leading-blank': [1, 'always'],
		/**
		 * type[scope]: [function] description
		 *
		 * - something here
		 *
		 * ^^^^^^^^^^^^^^
		 */
		'footer-leading-blank': [1, 'always'],
		/**
		 * type[scope]: [function] description [No more than 72 characters]
		 *      ^^^^^
		 */
		'header-max-length': [2, 'always', 72],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		/**
		 * type[scope]: [function] description
		 * ^^^^
		 */
		'type-enum': [
			2,
			'always',
			['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'release', 'style', 'test', 'improvement']
		]
	},
	prompt: {
		allowCustomIssuePrefixs: false,
		allowEmptyIssuePrefixs: false
	}
}
