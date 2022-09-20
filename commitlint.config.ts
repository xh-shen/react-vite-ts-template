/*
 * @Author: shen
 * @Date: 2022-09-20 10:54:13
 * @LastEditors: shen
 * @LastEditTime: 2022-09-20 16:21:35
 * @Description:
 */
import { execSync } from 'child_process'
import fg from 'fast-glob'

const getPackages = packagePath => fg.sync('*', { cwd: packagePath, onlyDirectories: true })

const scopes = [...getPackages('src'), 'public', 'core']

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n')

const scopeComplete = gitStatus
	.find(r => ~r.indexOf('M  src'))
	?.replace(/\//g, '%%')
	?.match(/src%%((\w|-)*)/)?.[1]

const subjectComplete = gitStatus
	.find(r => ~r.indexOf('M  src/pages'))
	?.replace(/\//g, '%%')
	?.match(/src%%pages%%((\w|-)*)/)?.[1]

export default {
	rules: {
		'scope-enum': [2, 'always', scopes],
		'body-leading-blank': [1, 'always'],
		'footer-leading-blank': [1, 'always'],
		'header-max-length': [2, 'always', 144],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'release', 'style', 'test', 'improvement']
		]
	},
	prompt: {
		defaultScope: scopeComplete,
		customScopesAlign: !scopeComplete ? 'top' : 'bottom',
		defaultSubject: subjectComplete && `[${subjectComplete}] `,
		allowCustomIssuePrefixs: false,
		allowEmptyIssuePrefixs: false
	}
}
