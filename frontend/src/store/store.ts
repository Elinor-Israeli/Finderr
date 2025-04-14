import { configureStore } from "@reduxjs/toolkit"
import { gigReducer } from './reducers/gig.reducer' 
import { userReducer } from './reducers/user.reducer' 
import { systemReducer } from './reducers/system.reducer'
import { orderReducer } from './reducers/order.reducer'
import { Reducer } from 'redux'
import { GigState } from "../types/Gig"
import { SystemState} from '../store/reducers/system.reducer'
import { UserState} from "../types/User"
import { OrderState} from '../types/Order'


export const store = configureStore({
    reducer: {
      gigModule: gigReducer as Reducer<GigState>,
      userModule: userReducer as Reducer<UserState>,
      systemModule: systemReducer as Reducer<SystemState>,
      orderModule: orderReducer as Reducer<OrderState>,
    },
    devTools: process.env.NODE_ENV !== "production", // Enables Redux DevTools in development mode
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
 