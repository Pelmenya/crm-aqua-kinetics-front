import { TTGUser } from '@/entities/user/model/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    }),

    endpoints: (builder) => ({
        postAuth: builder.mutation<TTGUser, string | undefined>({
            query: (authKey) => ({
                url: 'auth',
                method: 'POST',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
                credentials: 'include'
            }),
        }),
    }),
});

export const { usePostAuthMutation } = authApi;