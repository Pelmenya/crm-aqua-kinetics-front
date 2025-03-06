import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/api/auth-api';
import { addressApi } from '@/features/address-search/api/address-api';
import { userSlice } from '@/entities/user/model/user-slice';
import { realEstateSlice } from '@/features/real-estate/model/real-estate-slice';
import { realEstateApi } from '@/features/real-estate/api/real-estate-api';
import { locationSlice } from '@/entities/location/model/location-slice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [realEstateApi.reducerPath]: realEstateApi.reducer,
        user: userSlice.reducer,
        realEstate: realEstateSlice.reducer,
        location: locationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            addressApi.middleware,
            realEstateApi.middleware,
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
