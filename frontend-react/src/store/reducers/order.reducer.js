export const SET_ORDERS_BUYER = 'SET_ORDERS_BUYER'
export const SET_ORDERS_SELLER = 'SET_ORDERS_SELLER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'

const initialState = {
    buyerOrders: [],
    sellerOrders: []
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders

    switch (action.type) {
        case SET_ORDERS_BUYER:
            newState = { ...state,buyerOrders: action.buyerOrders }
            break
        case SET_ORDERS_SELLER:
            newState = { ...state, sellerOrders: action.sellerOrders }
            break
        case ADD_ORDER:
            newState = { ...state, buyerOrders: [...state.buyerOrders, action.buyerOrder] }
            break
        case UPDATE_ORDER:
            orders = state.sellerOrders.map(sellerOrder =>
                sellerOrder._id === action.sellerOrder._id ? action.sellerOrder : sellerOrder
            )
            newState = { ...state, sellerOrders: orders }
            break
        default:
    }
    return newState
}
