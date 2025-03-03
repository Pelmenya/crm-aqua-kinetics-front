import { userSlice } from '@/entities/user/model/user-slice';
import { addressApi } from '@/features/address-search/api/address-api';
import { authApi } from '@/features/auth/api/auth-api';
import { realEstateSlice } from '@/pages/add-house/model/real-estate-slice';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        user: userSlice.reducer,
        realEstate: realEstateSlice.reducer, // Добавьте новый редьюсер
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            addressApi.middleware,
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
