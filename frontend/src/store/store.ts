import { configureStore } from "@reduxjs/toolkit";
import { gigReducer } from './reducers/gig.reducer' 
import { userReducer } from './reducers/user.reducer' 
import { systemReducer } from './reducers/system.reducer'
import { orderReducer } from './reducers/order.reducer'

export const store = configureStore({
    reducer: {
      gigModule: gigReducer,
      userModule: userReducer,
      systemModule: systemReducer,
      orderModule: orderReducer,
    },
    devTools: process.env.NODE_ENV !== "production", // Enables Redux DevTools in development mode
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
 