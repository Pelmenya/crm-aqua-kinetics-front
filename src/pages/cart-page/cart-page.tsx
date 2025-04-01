import { getCartItems } from "@/features/cart/model/cart-selectors";
import { CartList } from "@/features/cart/ui/cart-list/cart-list";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Page } from "@/shared/ui/components/page/page";
import { DataJson } from "@/shared/ui/helpers/data-json/data-json";
import { FC } from "react";

export const CartPage: FC = () => {
    const cartItems = useAppSelector(getCartItems);

    return (
        <Page back={true} className="bg-base-300 pt-2">
            <h1 className="block w-full text-center pb-4 text-lg font-bold">Корзина</h1>
            {Object.keys(cartItems).length > 0 ? <>
                <CartList items={cartItems} />

                <DataJson data={Object.keys(cartItems['04100e54-ff58-11ef-0a80-06c800129c16'])} />
            </> : null
            }
        </Page>
    )
} 