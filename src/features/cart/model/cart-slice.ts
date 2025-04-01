import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '@/features/moy-sklad/model/types/t-product';
import { TService } from '@/features/moy-sklad/model/types/t-service';

export type TServiceList = Record<string, { service: Partial<TService>; count: number; checked: boolean }>;

export type TServiceItem = { service: Partial<TService>; count: number; checked: boolean };

export type TCartItem = {
    product: TProduct;
    count: number;
    services: TServiceList;
};

export type TCartState = {
    items: Record<string, TCartItem>;
};

export const initialState: TCartState = {
    items: {},
};

// Вспомогательная функция для проверки, должны ли мы удалить продукт
const shouldRemoveProduct = (productItem: TCartItem): boolean => {
    const allServicesZero = Object.values(productItem.services).every(service => service.count === 0);
    return productItem.count === 0 && allServicesZero;
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
                if (shouldRemoveProduct(state.items[productId])) {
                    delete state.items[productId];
                }
            }
        },
        addServiceToProduct: (state, action: PayloadAction<{ productId: string; service: Partial<TService>; count: number }>) => {
            const { productId, service, count } = action.payload;
            if (state.items[productId] && service.id) {
                state.items[productId].services[service.id] = { service, count, checked: count > 0 };
            }
        },
        updateServiceCount: (state, action: PayloadAction<{ productId: string; serviceId: string; count: number }>) => {
            const { productId, serviceId, count } = action.payload;
            if (state.items[productId] && state.items[productId].services[serviceId]) {
                state.items[productId].services[serviceId].count = count;
                state.items[productId].services[serviceId].checked = count > 0;
                if (shouldRemoveProduct(state.items[productId])) {
                    delete state.items[productId];
                }
            }
        },
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            delete state.items[action.payload];
        },
        removeServiceFromProduct: (state, action: PayloadAction<{ productId: string; serviceId: string }>) => {
            const { productId, serviceId } = action.payload;
            if (state.items[productId] && state.items[productId].services[serviceId]) {
                delete state.items[productId].services[serviceId];
                if (shouldRemoveProduct(state.items[productId])) {
                    delete state.items[productId];
                }
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
