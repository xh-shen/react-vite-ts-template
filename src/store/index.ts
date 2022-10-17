/*
 * @Author: shen
 * @Date: 2022-09-26 10:45:59
 * @LastEditors: shen
 * @LastEditTime: 2022-10-16 18:30:16
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tabs from './modules/tabs'
export * from './modules'
export * from './hooks'

export const store = configureStore({
	reducer: { app, user, permission, tabs }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
