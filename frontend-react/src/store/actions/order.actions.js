import { store } from '../store' 
import { ADD_ORDER, SET_ORDERS, UPDATE_ORDER  } from '../reducers/order.reducer'

import { orderService } from '../../services/order.service'
import { socketService, SOCKET_EVENT_ORDER_ADDED } from '../../services/socket.service'

export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}



export async function loadOrders(userId) {
    try {
        const orders = await orderService.query(userId)
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        // socketService.emit(SOCKET_EVENT_ORDER_ADDED,
            // {
            //     buyerName: order.buyer.fullname,
            //     sellerId: order.seller._id
            // })
        // store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}



export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionUpdateOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}