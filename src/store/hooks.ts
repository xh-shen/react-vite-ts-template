/*
 * @Author: shen
 * @Date: 2022-09-26 10:51:50
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 10:51:57
 * @Description:
 */
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
