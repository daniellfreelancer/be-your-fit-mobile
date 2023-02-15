import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
    reducerPath: 'userAPI',

    baseQuery:fetchBaseQuery({
        baseUrl: 'https://beyourfit.online'
    }),

    endpoints:(builder) => ({
        signInUser: builder.mutation({
            query: (user) => ({
                url: '/usersapp/signin',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        signUpUser: builder.mutation({
            query: (user) => ({
                url: '/usersapp/signup',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
    })
})

export default userAPI
export const { useSignUpUserMutation, useSignInUserMutation} = userAPI