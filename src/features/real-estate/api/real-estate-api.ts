import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TRealEstateState } from '../model/real-estate-slice';

// Определение типа для координат в формате GeoJSON
export type TGeoJSONCoordinates = {
    type: 'Point';
    coordinates: [number, number];
};

export type TCreateRealEstate = Omit<TRealEstateState, 'coordinates'> & {
    id?: number;
    coordinates: TGeoJSONCoordinates | null;
};

export type TUpdateRealEstate = Partial<TCreateRealEstate>;

export const realEstateApi = createApi({
    reducerPath: 'realEstateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/real-estate',
    }),
    endpoints: (builder) => ({
        getRealEstates: builder.query<TCreateRealEstate[], string>({
            query: (authKey) => ({
                url: '/',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        getRealEstateById: builder.query<TRealEstateState, { id: number, authKey: string }>({
            query: ({ id, authKey }) => ({
                url: `/${id}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        createRealEstate: builder.mutation<TRealEstateState, { newRealEstate: TCreateRealEstate; authKey: string }>({
            query: ({ newRealEstate, authKey }) => ({
                url: '/',
                method: 'POST',
                credentials: 'include',
                body: newRealEstate,
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        updateRealEstate: builder.mutation<TRealEstateState, { id: number; data: TUpdateRealEstate; authKey: string }>({
            query: ({ id, data, authKey }) => ({
                url: `/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        deleteRealEstate: builder.mutation<void, { id: number, authKey: string }>({
            query: ({ id, authKey }) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
    }),
});

export const {
    useGetRealEstatesQuery,
    useGetRealEstateByIdQuery,
    useCreateRealEstateMutation,
    useUpdateRealEstateMutation,
    useDeleteRealEstateMutation,
} = realEstateApi;
