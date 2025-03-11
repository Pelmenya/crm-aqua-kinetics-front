import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { TNullable } from '@/shared/lib/types/t-nullable';

export type TCoordinates = {
    latitude: number;
    longitude: number;
};

export type TAccountServiceState = {
    id: TNullable<string>;
    address: TNullable<string>;
    radiusKm: TNullable<number>;
    coordinates: TNullable<TCoordinates>;
    carNumber: TNullable<string>;
    carModel: TNullable<string>;
    workDays: TWorkDay[];
    selectedWorkDay: TNullable<TWorkDay>;
    isEditorOpen: boolean;
};

const initialState: TAccountServiceState = {
    id: null,
    address: null,
    coordinates: null,
    radiusKm: null,
    carNumber: null,
    carModel: null,
    workDays: [],
    selectedWorkDay: null,
    isEditorOpen: false,
};

export const accountServiceSlice = createSlice({
    name: 'accountService',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<TNullable<string>>) {
            state.address = action.payload;
        },
        setRadiusKm(state, action: PayloadAction<TNullable<number>>) {
            state.radiusKm = action.payload;
        },
        setCoordinates(state, action: PayloadAction<TNullable<TCoordinates>>) {
            state.coordinates = action.payload;
        },
        setCarNumber(state, action: PayloadAction<TNullable<string>>) {
            state.carNumber = action.payload;
        },
        setCarModel(state, action: PayloadAction<TNullable<string>>) {
            state.carModel = action.payload;
        },
        resetAccountServiceState(state) {
            state.id = initialState.id;
            state.address = initialState.address;
            state.radiusKm = initialState.radiusKm;
            state.coordinates = initialState.coordinates;
            state.carNumber = initialState.carNumber;
            state.carModel = initialState.carModel;
            state.workDays = initialState.workDays;
            state.selectedWorkDay = initialState.selectedWorkDay;
            state.isEditorOpen = initialState.isEditorOpen;
        },
        setWorkDays(state, action: PayloadAction<TWorkDay[]>) {
            state.workDays = action.payload;
        },
        selectWorkDay(state, action: PayloadAction<TNullable<TWorkDay>>) {
            state.selectedWorkDay = action.payload;
            state.isEditorOpen = action.payload !== null;
        },
        saveWorkDay(state, action: PayloadAction<TWorkDay>) {
            const updatedDay = action.payload;
            const dayExists = state.workDays.some(day => day.dayOfWeek === updatedDay.dayOfWeek);

            if (dayExists) {
                state.workDays = state.workDays.map(day =>
                    day.dayOfWeek === updatedDay.dayOfWeek ? updatedDay : day
                );
            } else {
                state.workDays.push(updatedDay);
            }
            state.isEditorOpen = false;
        },
        removeWorkDay(state) {
            if (state.selectedWorkDay) {
                state.workDays = state.workDays.filter(day => day.dayOfWeek !== state.selectedWorkDay?.dayOfWeek);
                state.selectedWorkDay = null;
                state.isEditorOpen = false;
            }
        },
        closeEditor(state) {
            state.isEditorOpen = false;
        },
    },
});

export const {
    setAddress,
    setRadiusKm,
    setCoordinates,
    setCarNumber,
    setCarModel,
    resetAccountServiceState,
    setWorkDays,
    selectWorkDay,
    saveWorkDay,
    removeWorkDay,
    closeEditor,
} = accountServiceSlice.actions;

