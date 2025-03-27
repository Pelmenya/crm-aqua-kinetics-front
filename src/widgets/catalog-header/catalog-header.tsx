import { Link } from "@/app/link/link";
import { Cart } from "@/shared/ui/icons/cart";
import { Search } from "@/shared/ui/icons/search";
import { FC } from "react";
import cn from 'classnames';

export const CatalogHeader: FC<{
    title: string;
    className?: string;
}> = ({ title, className }) => {

    return (
        <header className={cn('py-2 px-4 w-full flex justify-between ', className)}>
            <Search />
            <h1 className="font-medium">{title}</h1>
            <Link to='/cart' className="relative z-100">
                <Cart />
            </Link>
        </header>
    )

}