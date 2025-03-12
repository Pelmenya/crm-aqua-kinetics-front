import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAccountServiceState } from '../model/account-service-slice';
import { TWorkDay } from '@/shared/lib/types/t-work-day';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

// Тип для создания AccountService
export type TCreateAccountService = Omit<TAccountServiceState, 'coordinates'> & {
    coordinates: { type: 'Point'; coordinates: [number, number] } | null;
    workDays: TWorkDay[];
};


export const accountServiceApi = createApi({
    reducerPath: 'accountServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/service',
    }),
    endpoints: (builder) => ({
        createOrUpdateAccountService: builder.mutation<TAccountServiceState, { newAccountService: TCreateAccountService; authKey: string }>({
            query: ({ newAccountService, authKey }) => ({
                url: 'account',
                method: 'POST',
                credentials: 'include',
                body: newAccountService,
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        getAccountServiceByUser: builder.query<TAccountServiceState, string>({
            query: (authKey) => ({
                url: 'account',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),

        deleteAccountService: builder.mutation<void, { id: string; authKey: string }>({
            query: ({ id, authKey }) => ({
                url: `account/${id}`,
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
    useCreateOrUpdateAccountServiceMutation,
    useGetAccountServiceByUserQuery,    
    useDeleteAccountServiceMutation,
} = accountServiceApi;
