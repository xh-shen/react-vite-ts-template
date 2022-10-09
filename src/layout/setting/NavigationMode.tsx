/*
 * @Author: shen
 * @Date: 2022-10-09 15:11:08
 * @LastEditors: shen
 * @LastEditTime: 2022-10-09 16:50:58
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
	const pageStyle = useAppSelector(state => state.app.pageStyle)
	const dispatch = useAppDispatch()
	const items = [
		{
			key: 'light',
			title: t('setting.pageStyle.lightMenu')
		},
		{
			key: 'dark',
			title: t('setting.pageStyle.darkMenu')
		},
		{
			key: 'realDark',
			title: t('setting.pageStyle.dark')
		}
	]
	return (
		<div className={prefixCls}>
			{items.map(item => (
				<Tooltip key={item.key} placement="top" title={item.title}>
					<div
						className={`${prefixCls}-item ${prefixCls}-item-${item.key}`}
						onClick={() => dispatch(setAppSettingValues({ key: 'pageStyle', value: item.key }))}
					>
						<CheckOutlined
							className={`${prefixCls}-item-select`}
							style={{ display: pageStyle === item.key ? 'block' : 'none' }}
						/>
					</div>
				</Tooltip>
			))}
		</div>
	)
}

export default NavigationMode
