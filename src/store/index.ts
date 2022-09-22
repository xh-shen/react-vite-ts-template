/*
 * @Author: shen
 * @Date: 2022-09-22 15:44:29
 * @LastEditors: shen
 * @LastEditTime: 2022-09-22 16:38:01
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit'
import app from './reducer/app'
import counter from './reducer/counter'

export const store = configureStore({
	reducer: { app, counter }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
