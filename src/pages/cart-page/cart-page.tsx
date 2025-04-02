import { Link } from "@/app/link/link";
import { getCartItems } from "@/entities/cart/model/cart-selectors";
import { CartIsEmpty } from "@/entities/cart/ui/cart-is-empty/cart-is-empty";
import { CartList } from "@/entities/cart/ui/cart-list/cart-list";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const CartPage: FC = () => {
    const cartItems = useAppSelector(getCartItems);
    const cartIsFull = Object.keys(cartItems).length > 0;
    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-6">
            <div className="w-full">
                <h1 className="block w-full text-center pb-4 text-lg font-bold">Корзина</h1>
                {cartIsFull ? <>
                    <CartList items={cartItems} />
                </> : <CartIsEmpty />
                }
            </div>
            <div className="w-full px-4 pb-4">
                {cartIsFull 
                    ? <Link to="/checkout" className="btn btn-primary w-full">Оформить</Link> 
                    : <Link to="/catalog" className="btn btn-primary w-full">Вернуться в каталог</Link>}

            </div>
        </Page>
    )
} 