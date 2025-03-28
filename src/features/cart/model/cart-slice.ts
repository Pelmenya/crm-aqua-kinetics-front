import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '@/features/moy-sklad/model/types/t-product';
import { TService } from '@/features/moy-sklad/model/types/t-service';

type TCartItem = {
    product: TProduct;
    count: number;
    services: Record<string, { service: TService; count: number; checked: boolean }>;
};

type TCartState = {
    items: Record<string, TCartItem>;
};

const initialState: TCartState = {
    items: {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<{ product: TProduct; count: number }>) => {
            const { product, count } = action.payload;
            if (!state.items[product.id]) {
                state.items[product.id] = {
                    product,
                    count,
                    services: {},
                };
            } else {
                state.items[product.id].count += count;
            }
        },
        updateProductCount: (state, action: PayloadAction<{ productId: string; count: number }>) => {
            const { productId, count } = action.payload;
            if (state.items[productId]) {
                state.items[productId].count = count;
            }
        },
        addServiceToProduct: (state, action: PayloadAction<{ productId: string; service: TService; count: number }>) => {
            const { productId, service, count } = action.payload;
            if (state.items[productId]) {
                state.items[productId].services[service.id] = { service, count, checked: count > 0 };
            }
        },
        updateServiceCount: (state, action: PayloadAction<{ productId: string; serviceId: string; count: number }>) => {
            const { productId, serviceId, count } = action.payload;
            if (state.items[productId] && state.items[productId].services[serviceId]) {
                state.items[productId].services[serviceId].count = count;
                state.items[productId].services[serviceId].checked = count > 0;
            }
        },
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            delete state.items[action.payload];
        },
        removeServiceFromProduct: (state, action: PayloadAction<{ productId: string; serviceId: string }>) => {
            const { productId, serviceId } = action.payload;
            if (state.items[productId] && state.items[productId].services[serviceId]) {
                delete state.items[productId].services[serviceId];
            }
        },
    },
});

export const {
    addProductToCart,
    updateProductCount,
    addServiceToProduct,
    updateServiceCount,
    removeProductFromCart,
    removeServiceFromProduct,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
