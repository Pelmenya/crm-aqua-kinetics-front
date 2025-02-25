import { TTGChatData } from '@/entities/user/model/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://newly-wired-grouse.cloudpub.ru',
    }),

    endpoints: (builder) => ({
        postAuth: builder.mutation<TTGChatData, string | undefined>({
            query: (authKey) => ({
                url: 'auth',
                method: 'POST',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
                credentials: 'include'
            }),
        }),
        getAuth: builder.query<string | undefined, string | undefined>({
            query: () => ({
                url: '',
                method: 'GET',
            }),
        }),

    }),
});

export const { usePostAuthMutation, useGetAuthQuery } = authApi;