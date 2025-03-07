import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

export type TAccountServiceState = {
    id: string | null;
    address: string | null;
    radiusKm: number | null;
    coordinates: TCoordinates | null;
    carNumber: string | null;
    carModel: string | null;
};

const initialState: TAccountServiceState = {
    id: null,
    address: null,
    coordinates: null,
    radiusKm: null,
    carNumber: null,
    carModel: null,
};

export const accountServiceSlice = createSlice({
    name: 'accountService',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string | null>) {
            state.address = action.payload;
        },
        setRadiusKm(state, action: PayloadAction<number | null>) {
            state.radiusKm = action.payload;
        },
        setCoordinates(state, action: PayloadAction<TCoordinates | null>) {
            state.coordinates = action.payload;
        },
        setCarNumber(state, action: PayloadAction<string | null>) {
            state.carNumber = action.payload;
        },
        setCarModel(state, action: PayloadAction<string | null>) {
            state.carModel = action.payload;
        },
        resetAccountServiceState(state) {
            state.id = initialState.id;
            state.address = initialState.address;
            state.radiusKm = initialState.radiusKm;
            state.coordinates = initialState.coordinates;
            state.carNumber = initialState.carNumber;
            state.carModel = initialState.carModel;
        },
    },
});

export const { 
    setAddress, 
    setRadiusKm, 
    setCoordinates, 
    setCarNumber, 
    setCarModel, 
    resetAccountServiceState 
} = accountServiceSlice.actions;

