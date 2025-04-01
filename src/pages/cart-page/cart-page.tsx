import { getCartItems } from "@/features/cart/model/cart-selectors";
import { CartIsEmpty } from "@/features/cart/ui/cart-is-empty/cart-is-empty";
import { CartList } from "@/features/cart/ui/cart-list/cart-list";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const CartPage: FC = () => {
    const cartItems = useAppSelector(getCartItems);

    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-6">
            <div className="w-full">
                <h1 className="block w-full text-center pb-4 text-lg font-bold">Корзина</h1>
                {Object.keys(cartItems).length > 0 ? <>
                    <CartList items={cartItems} />
                </> : <CartIsEmpty />
                }
            </div>
            <div className="w-full px-4 pb-4">
                <button className="btn btn-primary w-full">Оформить</button>
            </div>
        </Page>
    )
} 