import { legacy_createStore as createStore, combineReducers } from 'redux'
import { gigReducer } from './reducers/gig.reducer' 
import { userReducer } from './reducers/user.reducer' 
import { systemReducer } from './reducers/system.reducer'
import { orderReducer } from './reducers/order.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    orderModule: orderReducer,
})


const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(rootReducer,middleware) 

