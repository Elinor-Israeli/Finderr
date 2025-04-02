export const SET_ORDERS_BUYER = 'SET_ORDERS_BUYER' 
export const SET_ORDERS_SELLER = 'SET_ORDERS_SELLER' 
export const ADD_ORDER_BUYER = 'ADD_ORDER_BUYER'
export const ADD_ORDER_SELLER = 'ADD_ORDER_SELLER' 
export const UPDATE_ORDER_SELLER = 'UPDATE_ORDER_SELLER'
export const UPDATE_ORDER_BUYER = 'UPDATE_ORDER_BUYER' 

import { Gig } from './Gig'

export interface Order {
    _id: string
    buyerId: string
    sellerId: string
    gigId: string
    gig:Gig
    status: 'pending' | 'approved' | 'rejected'
    createdAt: number
}

export interface OrderState {
    buyerOrders: Order[]
    sellerOrders: Order[]
}

export interface SetOrderBuyerAction {
    type: typeof SET_ORDERS_BUYER
    buyerOrders: Order[]
}

export interface SetOrderSellerAction {
    type: typeof SET_ORDERS_SELLER
    sellerOrders: Order[]
}

export interface AddOrderBuyerAction {
    type: typeof ADD_ORDER_BUYER
    buyerOrder: Order
}

export interface AddOrderSellerAction {
    type: typeof ADD_ORDER_SELLER
    sellerOrder: Order
}

export interface UpdateOrderBuyerAction {
    type: typeof UPDATE_ORDER_BUYER
    buyerOrder: Order
}

export interface UpdateOrderSellerAction {
    type: typeof UPDATE_ORDER_SELLER
    sellerOrder: Order
}

export type OrderActionTypes = 
    | SetOrderBuyerAction 
    | SetOrderSellerAction 
    | AddOrderBuyerAction 
    | AddOrderSellerAction 
    | UpdateOrderBuyerAction 
    | UpdateOrderSellerAction
