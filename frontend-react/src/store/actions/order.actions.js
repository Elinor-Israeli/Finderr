import { store } from '../store' 
import { ADD_ORDER, SET_ORDERS, UPDATE_ORDER  } from '../reducers/order.reducer'
import { orderService } from '../../services/order.service'

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



export async function loadOrders(role) {
     try {
        const orders = await orderService.query(role)
        store.dispatch({ type: SET_ORDERS, orders })
        
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
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