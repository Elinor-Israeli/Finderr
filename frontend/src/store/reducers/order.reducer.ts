import { 
    OrderActionTypes, 
    OrderState, 
    SetOrderBuyerAction, 
    SetOrderSellerAction,
    AddOrderBuyerAction, 
    AddOrderSellerAction, 
    UpdateOrderBuyerAction,
    UpdateOrderSellerAction,
    SET_ORDERS_BUYER,
    SET_ORDERS_SELLER,
    ADD_ORDER_BUYER,
    ADD_ORDER_SELLER,
    UPDATE_ORDER_SELLER,
    UPDATE_ORDER_BUYER
} from '../../types/Order'


const initialState: OrderState = Object.freeze({
    buyerOrders: [],
    sellerOrders: [],
})

export function orderReducer(
    state: OrderState = initialState,
    action: OrderActionTypes
): OrderState {
    switch (action.type) {
        case SET_ORDERS_BUYER:
            const SetBuyerAction = action as SetOrderBuyerAction
            return { ...state, buyerOrders: SetBuyerAction.buyerOrders }

        case SET_ORDERS_SELLER:
            const SetSellerAction = action as SetOrderSellerAction
            return { ...state, sellerOrders: SetSellerAction.sellerOrders }

        case ADD_ORDER_BUYER:
            const AddBuyerAction = action as AddOrderBuyerAction
            return { ...state, buyerOrders: [...state.buyerOrders, AddBuyerAction.buyerOrder] }

        case ADD_ORDER_SELLER:
            const AddSellerAction = action as AddOrderSellerAction
            return { ...state, sellerOrders: [...state.sellerOrders, AddSellerAction.sellerOrder] }

        case UPDATE_ORDER_SELLER:
            const UpdateSellerAction = action as UpdateOrderSellerAction
            return {
                ...state,
                sellerOrders: state.sellerOrders.map((sellerOrder) =>
                    sellerOrder._id === UpdateSellerAction.sellerOrder._id ? UpdateSellerAction.sellerOrder : sellerOrder
                ),
            }

        case UPDATE_ORDER_BUYER:
            const UpdateBuyerAction = action as UpdateOrderBuyerAction
            return {
                ...state,
                buyerOrders: state.buyerOrders.map((buyerOrder) =>
                    buyerOrder._id === UpdateBuyerAction.buyerOrder._id ? UpdateBuyerAction.buyerOrder : buyerOrder
                ),
            }

        default:
            return state
    }
}
