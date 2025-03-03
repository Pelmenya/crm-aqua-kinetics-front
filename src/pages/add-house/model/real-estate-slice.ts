import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите типы для состояния
interface RealEstateState {
    address: string | null;
    coordinates: { latitude: number; longitude: number } | null;
}

// Установите начальное состояние
const initialState: RealEstateState = {
    address: null,
    coordinates: null,
};

// Создайте slice
export const realEstateSlice = createSlice({
    name: 'realEstate',
    initialState,
    reducers: {
        setRealEstateAddress(state, action: PayloadAction<string | null>) {
            state.address = action.payload;
        },
        setRealEstateCoordinates(state, action: PayloadAction<{ latitude: number; longitude: number } | null>) {
            state.coordinates = action.payload;
        },
    },
});

// Экспортируйте экшены
export const { setRealEstateAddress, setRealEstateCoordinates } = realEstateSlice.actions;

