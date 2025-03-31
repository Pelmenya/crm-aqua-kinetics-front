import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '@/features/moy-sklad/model/types/t-product';
import { TService } from '@/features/moy-sklad/model/types/t-service';

export type TCartItem = {
    product: TProduct;
    count: number;
    services: Record<string, { service: Partial<TService>; count: number; checked: boolean }>;
};

export type TCartState = {
    items: Record<string, TCartItem>;
};

export const initialState: TCartState = {
    items: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<TCartState>) => {
            state.items = action.payload.items;
        },
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
        addServiceToProduct: (state, action: PayloadAction<{ productId: string; service: Partial<TService>; count: number }>) => {
            const { productId, service, count } = action.payload;
            if (state.items[productId] && service.id) {
                state.items[productId].services[service.id] = { service, count, checked: count > 0 };
                console.log({ service, count, checked: count > 0 })
            }
        },
        updateServiceCount: (state, action: PayloadAction<{ productId: string; serviceId: string; count: number }>) => {
            const { productId, serviceId, count } = action.payload;
            if (state.items[productId] && state.items[productId].services[serviceId]) {
                state.items[productId].services[serviceId].count = count;
                state.items[productId].services[serviceId].checked = count > 0;
                console.log({ count, checked: count > 0 })
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
    setCart,
    addProductToCart,
    updateProductCount,
    addServiceToProduct,
    updateServiceCount,
    removeProductFromCart,
    removeServiceFromProduct,
} = cartSlice.actions;

