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
    address: string | null;
    coordinates: TCoordinates | null;
    waterIntakePoints: TWaterIntakePoints;
    activeType: 'house' | 'apartment';
    residents: number;
    activeSource: 'borehole' | 'well' | 'reservoir' | 'waterSupply';
};

// Установите начальное состояние
const initialState: TRealEstateState = {
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
        setInitialState(state, action: PayloadAction<TRealEstateState>) {
            state.address = action.payload.address;
            state.coordinates = action.payload.coordinates;
            state.waterIntakePoints = action.payload.waterIntakePoints;
            state.activeType = action.payload.activeType;
            state.residents = action.payload.residents;
            state.activeSource = action.payload.activeSource;
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
} = realEstateSlice.actions;