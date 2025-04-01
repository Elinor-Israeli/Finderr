import { store } from '../store' 
import { ADD_ORDER_BUYER,ADD_ORDER_SELLER, SET_ORDERS_BUYER, SET_ORDERS_SELLER, UPDATE_ORDER_SELLER,UPDATE_ORDER_BUYER  } from '../../types/Order'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { orderService } from '../../services/order/order.service.remote'

export function getActionAddOrderBuyer(buyerOrder) {
    return {
        type: ADD_ORDER_BUYER,
        buyerOrder
    }
}
export function getActionAddOrderSeller(sellerOrder) {
    return {
        type: ADD_ORDER_SELLER,
        sellerOrder
    }
}
export function getActionUpdateOrderSeller(sellerOrder) {
    return {
        type: UPDATE_ORDER_SELLER,
        sellerOrder
    }
}
export function getActionUpdateOrderBuyer(buyerOrder) {
    return {
        type: UPDATE_ORDER_BUYER,
        buyerOrder
    }
}

export async function loadOrdersBuyer() {
    store.dispatch({type: LOADING_START})
     try {
        const buyerOrders = await orderService.query('buyer')
        store.dispatch({ type: SET_ORDERS_BUYER, buyerOrders })
        
    } catch (err) {
        console.log('Cannot load buyerOrders', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadOrdersSeller() {
    store.dispatch({type: LOADING_START})
    try {
       const sellerOrders = await orderService.query('seller')
       store.dispatch({ type: SET_ORDERS_SELLER, sellerOrders })
       
   } catch (err) {
       console.log('Cannot load sellerOrders', err)
       throw err
   } finally {
    store.dispatch({ type: LOADING_DONE })
}
}

export async function addOrderBuyer(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionAddOrderBuyer(savedOrder))
        console.log('Saved order:', savedOrder)
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}
export async function addOrderSeller(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionAddOrderSeller(savedOrder))
        console.log('Saved order:', savedOrder)
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function updateOrderSeller(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionUpdateOrderSeller(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}

export async function updateOrderBuyer(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getActionUpdateOrderBuyer(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}