import { userSlice } from '@/entities/user/model/user-slice';
import { authApi } from '@/features/auth/api/auth-api';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        user: userSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
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