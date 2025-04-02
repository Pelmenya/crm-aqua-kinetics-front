import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { FC } from "react";
import { getTotalProductsCount, getTotalServicesCount } from "../../model/cart-selectors";

export const CartTotal: FC = () => {
    const totalProducts = useAppSelector(getTotalProductsCount);
    const totalServices = useAppSelector(getTotalServicesCount);

    return (
        <ul className="w-full">
            {totalProducts > 0 && <li className="w-full flex justify-between"><p>Товары</p><p>{totalProducts}</p></li>}
            {totalServices > 0 && <li className="w-full flex justify-between"><p>Услуги</p><p>{totalServices}</p></li>}
        </ul>
    )
}