import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите типы для состояния
interface Coordinates {
    latitude: number;
    longitude: number;
}

interface WaterIntakePoints {
    toilet: number;
    sink: number;
    bath: number;
    washingMachine: number;
    dishWasher: number;
    showerCabin: number;
}

interface RealEstateState {
    address: string | null;
    coordinates: Coordinates | null;
    waterIntakePoints: WaterIntakePoints;
}

// Установите начальное состояние
const initialState: RealEstateState = {
    address: null,
    coordinates: null,
    waterIntakePoints: {
        toilet: 0,
        sink: 0,
        bath: 0,
        washingMachine: 0,
        dishWasher: 0,
        showerCabin: 0,
    },
};

// Создайте slice
export const realEstateSlice = createSlice({
    name: 'realEstate',
    initialState,
    reducers: {
        setRealEstateAddress(state, action: PayloadAction<string | null>) {
            state.address = action.payload;
        },
        setRealEstateCoordinates(state, action: PayloadAction<Coordinates | null>) {
            state.coordinates = action.payload;
        },
        incrementWaterIntakePoint(state, action: PayloadAction<keyof WaterIntakePoints>) {
            state.waterIntakePoints[action.payload] += 1;
        },
        decrementWaterIntakePoint(state, action: PayloadAction<keyof WaterIntakePoints>) {
            if (state.waterIntakePoints[action.payload] > 0) {
                state.waterIntakePoints[action.payload] -= 1;
            }
        },
    },
});

// Экспортируйте экшены
export const {
    setRealEstateAddress,
    setRealEstateCoordinates,
    incrementWaterIntakePoint,
    decrementWaterIntakePoint,
} = realEstateSlice.actions;

// Экспортируйте редьюсер
export default realEstateSlice.reducer;
