import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/auth-api';
import { addressApi } from '@/features/address-search/api/address-api';
import { userSlice } from '@/entities/user/model/user-slice';
import { realEstateSlice } from '@/entities/real-estate/model/real-estate-slice';
import { realEstateApi } from '@/entities/real-estate/api/real-estate-api';
import { accountServiceSlice } from '@/entities/account-service/model/account-service-slice';
import { accountServiceApi } from '@/entities/account-service/api/account-service-api';
import { calendarServiceSlice } from '@/features/calendar-service/model/calendar-service-slice';
import { calendarServiceApi } from '@/features/calendar-service/api/calendar-service-api';
import { moySkladApi } from '@/features/moy-sklad/api/moy-sklad-api';
import { cartSlice } from '@/entities/cart/model/cart-slice';
import { cartApi } from '@/entities/cart/api/cart-api';
import logger from 'redux-logger';
import { orderSlice } from '@/entities/order/model/order-slice';

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [realEstateApi.reducerPath]: realEstateApi.reducer,
        [accountServiceApi.reducerPath]: accountServiceApi.reducer,
        [calendarServiceApi.reducerPath]: calendarServiceApi.reducer,
        [moySkladApi.reducerPath]: moySkladApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        user: userSlice.reducer,
        realEstate: realEstateSlice.reducer,
        accountService: accountServiceSlice.reducer,
        calendarService: calendarServiceSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware().concat(
            authApi.middleware,
            addressApi.middleware,
            realEstateApi.middleware,
            accountServiceApi.middleware,
            calendarServiceApi.middleware,
            moySkladApi.middleware,
            cartApi.middleware,
        );

        if (isDev) {
            middlewares.push(logger);
        }

        return middlewares;
    },
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