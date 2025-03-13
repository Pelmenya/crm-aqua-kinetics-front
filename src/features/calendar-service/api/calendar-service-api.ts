import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TWorkDay } from '@/shared/lib/types/t-work-day';

// Определение API-сервиса для календаря
export const calendarServiceApi = createApi({
    reducerPath: 'calendarServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/service',
    }),
    endpoints: (builder) => ({
        fillCalendar: builder.mutation<TWorkDay[], string>({
            query: (authKey) => ({
                url: 'fill-calendar',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        updateCalendarWorkDay: builder.mutation<TWorkDay[], { authKey: string; updateDto: Partial<TWorkDay> }>({
            query: ({ authKey, updateDto }) => ({
                url: 'calendar',
                method: 'PUT',
                credentials: 'include',
                body: updateDto,
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
        deleteCalendarWorkDay: builder.mutation<TWorkDay[], { authKey: string; updateDto: Partial<TWorkDay> }>({
            query: ({ authKey, updateDto }) => ({
                url: 'calendar',
                method: 'DELETE',
                credentials: 'include',
                body: updateDto,
                headers: {
                    Authorization: 'tma ' + authKey,
                },
            }),
        }),
    }),
});

export const {
    useFillCalendarMutation,
    useUpdateCalendarWorkDayMutation,
    useDeleteCalendarWorkDayMutation,
} = calendarServiceApi;
