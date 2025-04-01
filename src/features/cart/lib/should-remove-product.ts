import { TCartItem } from "../model/cart-slice";

// Вспомогательная функция для проверки, должны ли мы удалить продукт
export const shouldRemoveProduct = (productItem: TCartItem): boolean => {
    const allServicesZero = Object.values(productItem.services).every(service => service.count === 0);
    return productItem.count === 0 && allServicesZero;
};