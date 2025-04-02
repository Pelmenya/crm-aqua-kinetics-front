import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCartState } from '../model/cart-slice';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/cart',
    }),
    endpoints: (builder) => ({
        getCart: builder.query<TCartState, string>({
            query: (authKey) => ({
                url: '',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        updateCartState: builder.mutation<TCartState, { authKey: string; cartState: TCartState }>({
            query: ({ cartState, authKey }) => ({
                url: '',
                body: cartState,
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useUpdateCartStateMutation,
} = cartApi;
