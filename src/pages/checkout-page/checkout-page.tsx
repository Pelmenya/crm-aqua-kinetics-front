import { Link } from "@/app/link/link";
import { getCartItems } from "@/entities/cart/model/cart-selectors";
import { CartList } from "@/entities/cart/ui/cart-list/cart-list";
import { CartTotal } from "@/entities/cart/ui/cart-total/cart-total";
import { getRealEstateId } from "@/entities/order/model/order-selectors";
import { RealEstate } from "@/entities/real-estate/ui/real-estate/real-estate";
import { UserInfo } from "@/entities/user/ui/user-info/user-info";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const CheckoutPage: FC = () => {
    const cartItems = useAppSelector(getCartItems);
    const selectedRealEstateId = useAppSelector(getRealEstateId);


    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-4">
            <div className="px-4">
                <h1 className="block w-full text-center pb-4 text-lg font-bold">Оформление</h1>
                <UserInfo />
                <RealEstate />
            </div>
            {selectedRealEstateId ?

                <div>
                    <h4 className="px-4 pb-2">Заказ</h4>
                    <CartList items={cartItems} />
                    <div className="w-full pb-4 flex flex-col gap-4 px-4 pt-2">
                        <CartTotal />
                        <Link to='/contract' className="btn btn-primary w-full">Найти исполнителя</Link>
                    </div>
                </div> : null
            }
        </Page>
    )
} 