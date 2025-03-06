import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

export type TLocationState = {
    address: string | null;
    radiusKm: number;
    coordinates: TCoordinates | null;
};

const initialState: TLocationState = {
    address: null,
    radiusKm: 0,
    coordinates: null,
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationAddress(state, action: PayloadAction<string | null>) {
            state.address = action.payload;
        },
        setRadiusKm(state, action: PayloadAction<number>) {
            state.radiusKm = action.payload;
        },
        setLocationCoordinates(state, action: PayloadAction<TCoordinates | null>) {
            state.coordinates = action.payload;
        },
        resetLocationState(state) {
            state.address = initialState.address;
            state.radiusKm = initialState.radiusKm;
            state.coordinates = initialState.coordinates;
        },
    },
});

export const { setLocationAddress, setRadiusKm, setLocationCoordinates, resetLocationState } = locationSlice.actions;

// Экспортируйте редуктор для добавления в store
export default locationSlice.reducer;
