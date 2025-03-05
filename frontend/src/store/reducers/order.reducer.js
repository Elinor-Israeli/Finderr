export const SET_ORDERS_BUYER = 'SET_ORDERS_BUYER'
export const SET_ORDERS_SELLER = 'SET_ORDERS_SELLER'
export const ADD_ORDER_BUYER = 'ADD_ORDER_BUYER'
export const ADD_ORDER_SELLER = 'ADD_ORDER_SELLER'
export const UPDATE_ORDER_SELLER = 'UPDATE_ORDER_SELLER'
export const UPDATE_ORDER_BUYER = 'UPDATE_ORDER_BUYER'


const initialState = {
    buyerOrders: [],
    sellerOrders: []
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders

    switch (action.type) {
        case SET_ORDERS_BUYER:
            newState = { ...state, buyerOrders: action.buyerOrders }
            break
        case SET_ORDERS_SELLER:
            newState = { ...state, sellerOrders: action.sellerOrders }
            break
        case ADD_ORDER_BUYER:
            newState = { ...state, buyerOrders: [...state.buyerOrders, action.buyerOrder] }
            break
        case ADD_ORDER_SELLER:
            newState = { ...state, sellerOrders: [...state.sellerOrders, action.sellerOrder] }
            break
        case UPDATE_ORDER_SELLER:
            orders = state.sellerOrders.map(sellerOrder =>
                sellerOrder._id === action.sellerOrder._id ? action.sellerOrder : sellerOrder
            )
            newState = { ...state, sellerOrders: orders }
            break
        case UPDATE_ORDER_BUYER:
            orders = state.buyerOrders.map(buyerOrder =>
                buyerOrder._id === action.buyerOrder._id ? action.buyerOrder : buyerOrder
            )
            newState = { ...state, sellerOrders: orders }
            break
        default:
    }
    return newState
}
