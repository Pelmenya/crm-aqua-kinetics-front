//import { Search } from "@/shared/ui/icons/search";
import { FC } from "react";
import cn from 'classnames';
import { CartLinkWithIndicator } from "@/entities/cart/ui/cart-link-with-indicator/cart-link-with-indicator";

export const CatalogHeader: FC<{
    title?: string;
    className?: string;
}> = ({ title, className }) => {

    return (
        <header className={cn('pt-2 px-4 w-full flex justify-between', className)}>
            {/* <Search /> */}
            <h1 className="font-medium">{title}</h1>
            <CartLinkWithIndicator />
        </header>
    )

}