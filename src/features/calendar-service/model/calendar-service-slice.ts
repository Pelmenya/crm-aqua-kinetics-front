// store/calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { TNullable } from '@/shared/lib/types/t-nullable';

export type TCalendarServiceState = {
    workDays: TNullable<TWorkDay[]>;
    selectedWorkDay: TNullable<TWorkDay>;
    isEditorOpen: boolean;
};

const initialState: TCalendarServiceState = {
    workDays: null,
    selectedWorkDay: null,
    isEditorOpen: false,
};

export const calendarServiceSlice = createSlice({
    name: 'calendar-service',
    initialState,
    reducers: {
        setWorkDays(state, action: PayloadAction<TNullable<TWorkDay[]>>) {
            state.workDays = action.payload;
        },
        selectWorkDay(state, action: PayloadAction<TNullable<TWorkDay>>) {
            state.selectedWorkDay = action.payload;
            state.isEditorOpen = action.payload !== null;
        },
        saveWorkDay(state, action: PayloadAction<TWorkDay>) {
            const updatedDay = action.payload;
            const dayExists = state.workDays?.some(day => day.date?.toDateString() === updatedDay.date?.toDateString());

            if (dayExists) {
                state.workDays = state.workDays?.map(day =>
                    day.date?.toDateString() === updatedDay.date?.toDateString() ? updatedDay : day
                ) || [];
            } else {
                state.workDays = state.workDays ? [...state.workDays, updatedDay] : [updatedDay];
            }
            state.isEditorOpen = false;
        },
        removeWorkDay(state) {
            if (state.selectedWorkDay) {
                state.workDays = state.workDays?.filter(day => day.date?.toDateString() !== state.selectedWorkDay?.date?.toDateString()) || null;
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
    setWorkDays,
    selectWorkDay,
    saveWorkDay,
    removeWorkDay,
    closeEditor,
} = calendarServiceSlice.actions;
