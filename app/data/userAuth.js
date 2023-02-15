import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',

    initialState: {
        id: null,
        name: null,
        email:null,
        role:null,
        from:null,
        logged: false,
        imgUrl:null,
        weight:null,
        size:null,
        friends:null
    },
    reducers : {
        setUserLogin: (state, action) =>{
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
            state.from = action.payload.from
            state.imgUrl = action.payload.imgUrl
            state.weight = action.payload.weight
            state.size = action.payload.size
            state.friends = action.payload.friends
            state.logged = true
        },
        setUserLogout: (state, action) =>{
            state.id = null
            state.name = null
            state.email = null
            state.role = null
            state.from = null
            state.imgUrl = null
            state.weight = null
            state.size = null
            state.friends = null
            state.logged = false
        }
    }
})


export const { setUserLogin,setUserLogout} = authSlice.actions
export default authSlice.reducer
