import { TNullable } from '@/shared/lib/types/t-nullable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

export type TRealEstateType = 'house' | 'apartment' | 'prom';
export type TRealEstateSourceWater = 'borehole' | 'well' | 'reservoir' | 'waterSupply';

export type TWaterIntakePoints = {
    toilet: number;
    sink: number;
    bath: number;
    washingMachine: number;
    dishWasher: number;
    showerCabin: number;
};

export enum TRealEstateComponentLocation {
    ACCOUNT = 'account',
    CHECKOUT = 'checkout',
}

export type TRealEstateState = {
    progress: number;
    address: TNullable<string>;
    coordinates: TNullable<TCoordinates>;
    waterIntakePoints: TWaterIntakePoints;
    activeType: TRealEstateType
    residents: number;
    activeSource: TRealEstateSourceWater;
    location: TNullable<TRealEstateComponentLocation>;
};

// Установите начальное состояние
const initialState: TRealEstateState = {
    progress: 60,
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
    activeType: 'house',
    residents: 2,
    activeSource: 'borehole',
    location: null,
};

// Создайте slice
export const realEstateSlice = createSlice({
    name: 'realEstate',
    initialState,
    reducers: {
        setInitialState(state) {
            state.address = initialState.address;
            state.coordinates = initialState.coordinates;
            state.waterIntakePoints = initialState.waterIntakePoints;
            state.activeType = initialState.activeType;
            state.residents = initialState.residents;
            state.activeSource = initialState.activeSource;
            state.progress = initialState.progress;
        },
        setRealEstateAddress(state, action: PayloadAction<string | null>) {
            state.address = action.payload;
        },
        setRealEstateCoordinates(state, action: PayloadAction<TCoordinates | null>) {
            state.coordinates = action.payload;
        },
        incrementWaterIntakePoint(state, action: PayloadAction<keyof TWaterIntakePoints>) {
            state.waterIntakePoints[action.payload] += 1;
        },
        decrementWaterIntakePoint(state, action: PayloadAction<keyof TWaterIntakePoints>) {
            if (state.waterIntakePoints[action.payload] > 0) {
                state.waterIntakePoints[action.payload] -= 1;
            }
        },
        setActiveType(state, action: PayloadAction<TRealEstateType>) {
            state.activeType = action.payload;
        },
        setResidents(state, action: PayloadAction<number>) {
            state.residents = action.payload;
        },
        setActiveSource(state, action: PayloadAction<TRealEstateSourceWater>) {
            state.activeSource = action.payload;
        },
        setProgress(state, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
        setLocation(state, action: PayloadAction<TNullable<TRealEstateComponentLocation>>) {
            state.location = action.payload;
        }
    },
});

// Экспортируйте экшены
export const {
    setInitialState,
    setRealEstateAddress,
    setRealEstateCoordinates,
    incrementWaterIntakePoint,
    decrementWaterIntakePoint,
    setActiveType,
    setResidents,
    setActiveSource,
    setProgress,
    setLocation,
} = realEstateSlice.actions;