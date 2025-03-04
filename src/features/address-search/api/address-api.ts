import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TSuggestion = {
    machine: string;
    sign: string;
    value: string;
    zip: string;
};

export type TSuggestionAddressResponseData = {
    query: string;
    requestProcessTime: number;
    suggestions: TSuggestion[];
};

export type TPoint = {
    latitude: number;
    longitude: number;

}

export type TCoordinatesResData = {
    coordinates: TPoint;
};

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/proxy' }),
    endpoints: (builder) => ({
        getAddressSuggestions: builder.query<TSuggestionAddressResponseData, string>({
            query: (q: string) => ({
                url: `suggest/address?q=${q}`,
                method: 'GET',
                credentials: 'include'
            }),
            // Вы можете добавить transformResponse для обработки ответа, если это необходимо
        }),
        getCoordinates: builder.query<TCoordinatesResData, string>({
            query: (address: string) => ({
                url: `geocode?address=${encodeURIComponent(address)}`,
                method: 'GET',
                credentials: 'include'
            }),
        }),
    }),
});

export const { useGetAddressSuggestionsQuery, useGetCoordinatesQuery } = addressApi;
