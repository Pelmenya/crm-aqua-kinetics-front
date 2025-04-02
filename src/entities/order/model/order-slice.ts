import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
    selectedRealEstateId: number | null;
};

const initialState: OrderState = {
    selectedRealEstateId: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSelectedRealEstateId(state, action: PayloadAction<number | null>) {
            state.selectedRealEstateId = action.payload;
        },
    },
});

export const { setSelectedRealEstateId } = orderSlice.actions;
