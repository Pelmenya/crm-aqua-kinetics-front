import { TTGUser } from '@/entities/user/model/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/auth',
    }),

    endpoints: (builder) => ({
        // При первом заходе создаем юзера из ТГ
        postAuth: builder.mutation<TTGUser, string | undefined>({
            query: (authKey) => ({
                url: 'init',
                method: 'POST',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
                credentials: 'include'
            }),
        }),
        // Апдейтим юзера из ТГ с email и phone
        putRegister: builder.mutation<TTGUser, { email: string; phone: string; authKey: string | undefined }>({
            query: ({ email, phone, authKey }) => ({
                url: 'register',
                method: 'PUT',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
                credentials: 'include',
                body: {
                    email,
                    phone,
                },
            }),
        }),
    }),
});

export const { usePostAuthMutation, usePutRegisterMutation } = authApi;