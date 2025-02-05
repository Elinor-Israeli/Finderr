import { store } from '../store' 
import { ADD_ORDER, SET_ORDERS_BUYER, SET_ORDERS_SELLER, UPDATE_ORDER  } from '../reducers/order.reducer'
import { orderService } from '../../services/order.service'

export function getActionAddOrder(buyerOrder) {
    return {
        type: ADD_ORDER,
        buyerOrder
    }
}
export function getActionUpdateOrder(sellerOrder) {
    return {
        type: UPDATE_ORDER,
        sellerOrder
    }
}

export async function loadOrdersBuyer() {
     try {
        const buyerOrders = await orderService.query('buyer')
        store.dispatch({ type: SET_ORDERS_BUYER, buyerOrders })
        
    } catch (err) {
        console.log('Cannot load buyerOrders', err)
        throw err
    }
}

export async function loadOrdersSeller() {
    try {
       const sellerOrders = await orderService.query('seller')
       store.dispatch({ type: SET_ORDERS_SELLER, sellerOrders })
       
   } catch (err) {
       console.log('Cannot load sellerOrders', err)
       throw err
   }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionAddOrder(savedOrder))
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