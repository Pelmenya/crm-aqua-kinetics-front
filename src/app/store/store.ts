import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/auth-api';
import { addressApi } from '@/features/address-search/api/address-api';
import { userSlice } from '@/entities/user/model/user-slice';
import { realEstateSlice } from '@/features/real-estate/model/real-estate-slice';
import { realEstateApi } from '@/features/real-estate/api/real-estate-api';
import { accountServiceSlice } from '@/entities/account-service/model/account-service-slice';
import { accountServiceApi } from '@/entities/account-service/api/account-service-api';
import { calendarServiceSlice } from '@/features/calendar-service/model/calendar-service-slice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [realEstateApi.reducerPath]: realEstateApi.reducer,
        [accountServiceApi.reducerPath]: accountServiceApi.reducer,
        user: userSlice.reducer,
        realEstate: realEstateSlice.reducer,
        accountService: accountServiceSlice.reducer,
        calendarService: calendarServiceSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            addressApi.middleware,
            realEstateApi.middleware,
            accountServiceApi.middleware,
        ]),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const makeStore = () => store;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppState = ReturnType<TAppStore['getState']>;
export type TAppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TAppState,
    unknown,
    Action
>;
