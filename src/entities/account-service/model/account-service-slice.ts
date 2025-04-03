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
    coordinates: TNullable<TCoordinates>;
    carNumber: TNullable<string>;
    carModel: TNullable<string>;
    workDays: TNullable<TWorkDay[]>;
    calendarMonths: TNullable<number>;
    selectedWorkDay: TNullable<TWorkDay>;
    isEditorOpen: boolean;
};

const initialState: TAccountServiceState = {
    id: null,
    address: null,
    coordinates: null,
    carNumber: null,
    carModel: null,
    workDays: null,
    calendarMonths: null,
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
            state.coordinates = initialState.coordinates;
            state.carNumber = initialState.carNumber;
            state.carModel = initialState.carModel;
            state.workDays = initialState.workDays;
            state.selectedWorkDay = initialState.selectedWorkDay;
            state.isEditorOpen = initialState.isEditorOpen;
        },
        setWorkDays(state, action: PayloadAction<TNullable<TWorkDay[]>>) { // Обновлено: поддержка null
            state.workDays = action.payload;
        },
        selectWorkDay(state, action: PayloadAction<TNullable<TWorkDay>>) {
            state.selectedWorkDay = action.payload;
            state.isEditorOpen = action.payload !== null;
        },
        saveWorkDay(state, action: PayloadAction<TWorkDay>) {
            const updatedDay = action.payload;
            const dayExists = state.workDays?.some(day => day.dayOfWeek === updatedDay.dayOfWeek);

            if (dayExists) {
                state.workDays = state.workDays?.map(day =>
                    day.dayOfWeek === updatedDay.dayOfWeek ? updatedDay : day
                ) || [];
            } else {
                state.workDays = state.workDays ? [...state.workDays, updatedDay] : [updatedDay];
            }
            state.isEditorOpen = false;
        },
        removeWorkDay(state) {
            if (state.selectedWorkDay) {
                state.workDays = state.workDays?.filter(day => day.dayOfWeek !== state.selectedWorkDay?.dayOfWeek) || null;
                state.selectedWorkDay = null;
                state.isEditorOpen = false;
            }
        },
        closeEditor(state) {
            state.isEditorOpen = false;
        },
        setCalendarMonths(state, action: PayloadAction<number>) {
            state.calendarMonths = action.payload;

        }
    },
});

export const {
    setAddress,
    setCoordinates,
    setCarNumber,
    setCarModel,
    resetAccountServiceState,
    setWorkDays,
    selectWorkDay,
    saveWorkDay,
    removeWorkDay,
    closeEditor,
    setCalendarMonths,
} = accountServiceSlice.actions;
