import { useEffect } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { useUpdateCartStateMutation } from '@/features/cart/api/cart-api';
import { getCartItems } from '@/features/cart/model/cart-selectors';

export const useCartSynchronization = (authKey: string, productId?: string) => {
    const cart = useAppSelector(getCartItems);
    const cartItem = productId ? cart[productId] : undefined;
    const [updateCartState] = useUpdateCartStateMutation();

    useEffect(() => {
        const syncCartWithBackend = async () => {
            if (productId && cartItem) {
                try {

                    const updatedCartState = {
                        ...cart,
                        [String(productId)]: cartItem,
                    };

                    await updateCartState({ authKey, cartState: { items: updatedCartState } }).unwrap();
                } catch (error) {
                    console.error('Failed to update cart state on backend', error);
                }
            } else {
                // если изменились данные по товару и услугам до нуля, удаляем его
                await updateCartState({ authKey, cartState: { items: { ...cart } } }).unwrap();
            }
        };

        syncCartWithBackend();
    }, [cartItem, cart, productId, authKey, updateCartState]);
};
