import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCoordinates = {
  latitude: number;
  longitude: number;
};

export type WorkDayArea = {
  day: string;
  coordinates: number[][];
  color: string;
  name: string;
};

type PolygonState = {
  generalArea: number[][];
  workDayAreas: WorkDayArea[];
};

const initialState: PolygonState = {
  generalArea: [],
  workDayAreas: [],
};

export const serviceAreaSlice = createSlice({
  name: 'serviceArea',
  initialState,
  reducers: {
    setGeneralArea(state, action: PayloadAction<number[][]>) {
      state.generalArea = action.payload;
    },
    addWorkDayArea(state, action: PayloadAction<WorkDayArea>) {
      state.workDayAreas.push(action.payload);
    },
    updateWorkDayArea(state, action: PayloadAction<WorkDayArea>) {
      const index = state.workDayAreas.findIndex(area => area.day === action.payload.day);
      if (index !== -1) {
        state.workDayAreas[index] = action.payload;
      }
    },
    removeWorkDayArea(state, action: PayloadAction<string>) {
      state.workDayAreas = state.workDayAreas.filter(area => area.day !== action.payload);
    },
    resetAreas(state) {
      state.generalArea = [];
      state.workDayAreas = [];
    },
  },
});

export const { setGeneralArea, addWorkDayArea, updateWorkDayArea, removeWorkDayArea, resetAreas } = serviceAreaSlice.actions;
