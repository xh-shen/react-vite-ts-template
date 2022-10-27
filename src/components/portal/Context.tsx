/*
 * @Author: shen
 * @Date: 2022-10-26 08:58:46
 * @LastEditors: shen
 * @LastEditTime: 2022-10-26 08:58:55
 * @Description:
 */
import * as React from 'react'

export type QueueCreate = (appendFunc: VoidFunction) => void

const OrderContext = React.createContext<QueueCreate | null>(null)

export default OrderContext
