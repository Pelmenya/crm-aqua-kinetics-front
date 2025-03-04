import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

export type TWaterIntakePoints = {
    toilet: number;
    sink: number;
    bath: number;
    washingMachine: number;
    dishWasher: number;
    showerCabin: number;
};

export type TRealEstateState = {
    progress: number;
    address: string | null;
    coordinates: TCoordinates | null;
    waterIntakePoints: TWaterIntakePoints;
    activeType: 'house' | 'apartment';
    residents: number;
    activeSource: 'borehole' | 'well' | 'reservoir' | 'waterSupply';
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
        setActiveType(state, action: PayloadAction<'house' | 'apartment'>) {
            state.activeType = action.payload;
        },
        setResidents(state, action: PayloadAction<number>) {
            state.residents = action.payload;
        },
        setActiveSource(state, action: PayloadAction<'borehole' | 'well' | 'reservoir' | 'waterSupply'>) {
            state.activeSource = action.payload;
        },
        setProgress(state, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
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
} = realEstateSlice.actions;