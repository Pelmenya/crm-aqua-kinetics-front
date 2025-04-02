import { TRootState } from "@/app/store/store";

export const getCartItems = (state: TRootState) => state.cart.items;
export const getTotalCartItemsCount = (state: TRootState) => {
    const cartItems = state.cart.items;
    // Подсчитываем общее количество товаров и услуг
    const totalCartItemsCount = Object.values(cartItems).reduce((total, cartItem) => {
        const productCount = cartItem.count;
        const servicesCount = Object.values(cartItem.services).reduce((serviceTotal, service) => {
            return serviceTotal + (service.checked ? service.count : 0);
        }, 0);
        return total + productCount + servicesCount;
    }, 0);
    return totalCartItemsCount;
};

// Селектор для получения элемента корзины по идентификатору продукта
export const getCartItemById = (productId: string) => (state: TRootState) => 
    state.cart.items[productId];

export const getIsLoadingFromServer = (state: TRootState) => state.cart.isLoadingFromServer;

// Селектор для подсчета общего количества товаров
export const getTotalProductsCount = (state: TRootState) => {
    const cartItems = state.cart.items;
    return Object.values(cartItems).reduce((total, cartItem) => {
        return total + cartItem.count;
    }, 0);
};

// Селектор для подсчета общего количества услуг
export const getTotalServicesCount = (state: TRootState) => {
    const cartItems = state.cart.items;
    return Object.values(cartItems).reduce((total, cartItem) => {
        const servicesCount = Object.values(cartItem.services).reduce((serviceTotal, service) => {
            return serviceTotal + (service.checked ? service.count : 0);
        }, 0);
        return total + servicesCount;
    }, 0);
};
