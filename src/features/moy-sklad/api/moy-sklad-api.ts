import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Типы для товаров и изображений
export type TProduct = {
  id: string;
  name: string;
  description?: string;
};

export type TProductImage = {
  meta: {
    downloadHref: string;
  };
  title: string;
  filename: string;
  miniature: {
    downloadHref: string;
  };
};

export const moySkladApi = createApi({
  reducerPath: 'moySkladApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/moysklad',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<TProduct[], { q?: string; limit?: number; offset?: number }>({
      query: ({ q = '', limit = 10, offset = 0 }) => ({
        url: 'product',
        method: 'GET',
        params: { q, limit, offset },
      }),
    }),
    getProductImages: builder.query<TProductImage[], string>({
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
  useGetProductsQuery,
  useGetProductImagesQuery,
  useDownloadImageQuery,
} = moySkladApi;
