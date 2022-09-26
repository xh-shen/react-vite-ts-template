/*
 * @Author: shen
 * @Date: 2022-09-26 10:45:59
 * @LastEditors: shen
 * @LastEditTime: 2022-09-26 12:51:59
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit'
import app from './modules/app'
import user from './modules/user'
export * from './modules'
export * from './hooks'

export const store = configureStore({
	reducer: { app, user }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
