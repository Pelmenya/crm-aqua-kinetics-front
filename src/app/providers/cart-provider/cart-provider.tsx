import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useGetCartQuery } from '@/entities/cart/api/cart-api';
import { setCart } from '@/entities/cart/model/cart-slice';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Page } from '@/shared/ui/components/page/page';
import { Logo } from '@/shared/ui/components/logo/logo';
import { Loading } from '@/shared/ui/components/loading/loading';

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const lp = useLaunchParams();
    const dispatch = useAppDispatch();


    const { data: cart, isLoading, error } = useGetCartQuery(lp.initDataRaw ||'');

    useEffect(() => {
        if (cart) {
            dispatch(setCart(cart));
        }
    }, [cart, dispatch]);

    if (error && 'message' in error) return <div>Error loading cart: {error.message}</div>;

    return (
        <>
            {isLoading ? (
                <Page back={false}>
                    <div className='w-full h-full relative'>
                        <Logo />
                        <div className='w-full absolute top-100 flex flex-col items-center'>
                            <Loading size='loading-lg' color='text-primary' type='loading-infinity' />
                        </div>
                    </div>
                </Page>
            ) : (
                children
            )}
        </>
    );
};
