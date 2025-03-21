import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGroup } from '../model/types/t-group';
import { TProduct } from '../model/types/t-product';
import { TImage } from '../model/types/t-image';

export const moySkladApi = createApi({
    reducerPath: 'moySkladApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/moysklad',
    }),
    endpoints: (builder) => ({
        getTopLevelGroups: builder.query<TGroup[], void>({
            query: () => ({
                url: 'top-level-groups', 
                method: 'GET',
            }),
        }),
        getProducts: builder.query<TProduct[], { q?: string; limit?: number; offset?: number }>({
            query: ({ q = '', limit = 10, offset = 0 }) => ({
                url: 'product',
                method: 'GET',
                params: { q, limit, offset },
            }),
        }),
        getBundleImages: builder.query<TImage[], string>({
            query: (bundleId: string) => ({
                url: `bundle/${bundleId}/images`,
                method: 'GET',
            }),
        }),
        getProductImages: builder.query<TImage[], string>({
            query: (productId: string) => ({
                url: `product/${productId}/images`,
                method: 'GET',
            }),
        }),
        downloadImage: builder.query<Blob, string>({
            query: (downloadHref: string) => ({
                url: `image?href=${encodeURIComponent(downloadHref)}`,
                method: 'GET',
                responseHandler: (response) => response.blob(), // Обработка ответа как Blob
            }),
        }),
    }),
});

export const {
    useGetTopLevelGroupsQuery,
    useGetProductsQuery,
    useGetProductImagesQuery,
    useGetBundleImagesQuery,
    useDownloadImageQuery,
} = moySkladApi;
