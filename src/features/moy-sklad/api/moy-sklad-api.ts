// features/moy-sklad/api/moy-sklad-api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TGroup } from '../model/types/t-group';
import { TProduct } from '../model/types/t-product';
import { TImage } from '../model/types/t-image';
import { blobToBase64 } from '@/shared/lib/helpers/blob-to-base64';

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
        getSubGroups: builder.query<TGroup[], string>({
            query: (groupId: string) => ({
                url: `group/${groupId}/groups`,
                method: 'GET',
            }),
        }),
        getProduct: builder.query<TProduct, string>({
            query: (productId: string) => ({
                url: `product/${productId}`,
                method: 'GET',
            }),
        }),
        getProductsByGroup: builder.query<TProduct[], string>({
            query: (groupId: string) => ({
                url: `group/${groupId}/products`,
                method: 'GET',
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
        downloadImage: builder.query<string, string>({
            query: (downloadHref: string) => ({
                url: `image?href=${encodeURIComponent(downloadHref)}`,
                method: 'GET',
                responseHandler: async (response) => {
                    const blob = await response.blob();
                    return await blobToBase64(blob); // Для сериализации в редакс
                },
            }),
        }),
    }),
});

export const {
    useGetTopLevelGroupsQuery,
    useGetSubGroupsQuery,
    useGetProductQuery,
    useGetProductsByGroupQuery,
    useGetProductImagesQuery,
    useGetBundleImagesQuery,
    useDownloadImageQuery,
} = moySkladApi;
