import { Link } from "@/app/link/link";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Cart } from "@/shared/ui/icons/cart";
import { FC } from "react";
import { getTotalCartItemsCount } from "../../model/cart-selectors";

export const CartLinkWithIndicator: FC = () => {

    const totalCartItemsCount = useAppSelector(getTotalCartItemsCount);

    return (
        <Link to='/cart' className="relative z-100">
            <div className="indicator">
                <Cart />
                {totalCartItemsCount > 0 ?
                    <span className="indicator-item indicator-bottom indicator-start badge badge-xs badge-warning">
                        {totalCartItemsCount}
                    </span> : null}
            </div>
        </Link>
    );
}
