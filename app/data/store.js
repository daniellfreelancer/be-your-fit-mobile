import { configureStore }   from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { setupListeners } from '@reduxjs/toolkit/query'
import userAPI from "./userApi";
import authReducer from './userApi'


const store = configureStore({
    reducer :{
        auth: authReducer,
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
})

setupListeners(store.dispatch)
export default store