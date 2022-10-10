/*
 * @Author: shen
 * @Date: 2022-10-09 15:11:08
 * @LastEditors: shen
 * @LastEditTime: 2022-10-10 09:47:22
 * @Description:
 */
import { usePrefixCls } from '@/hooks'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { CheckOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useAppDispatch, useAppSelector, setAppSettingValues } from '@/store'

const NavigationMode: FC = () => {
	const { t } = useTranslation()
	const prefixCls = usePrefixCls('layout-setting-block-checkbox')
	const navigationMode = useAppSelector(state => state.app.navigationMode)
	const dispatch = useAppDispatch()
	const items = [
		{
			key: 'side',
			title: t('setting.navigationMode.siderMenu')
		},
		{
			key: 'top',
			title: t('setting.navigationMode.topMenu')
		},
		{
			key: 'mix',
			title: t('setting.navigationMode.mixinMenu')
		}
	]
	return (
		<div className={prefixCls}>
			{items.map(item => (
				<Tooltip key={item.key} placement="top" title={item.title}>
					<div
						className={`${prefixCls}-item ${prefixCls}-item-${item.key}`}
						onClick={() => dispatch(setAppSettingValues({ key: 'navigationMode', value: item.key }))}
					>
						<CheckOutlined
							className={`${prefixCls}-item-select`}
							style={{ display: navigationMode === item.key ? 'block' : 'none' }}
						/>
					</div>
				</Tooltip>
			))}
		</div>
	)
}

export default NavigationMode
