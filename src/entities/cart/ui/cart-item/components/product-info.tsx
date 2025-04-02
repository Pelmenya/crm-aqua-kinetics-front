import { TNullable } from "@/shared/lib/types/t-nullable";
import { FC } from "react";

export type TProductInfoProps = {
    title: TNullable<string>; 
    description?: string; 
    price?: number;
}

export const ProductInfo: FC<TProductInfoProps> =
    ({
        title,
        description,
        price,
    }) => {
        return (
            <div className='flex flex-col w-[220px]'>
                <h5 className='text-md opacity-70 text-sm font-semibold'>{title}</h5>
                {description && <p className="text-xs tracking-tight opacity-60 line-clamp-2">{description}</p>}
                {price && <p className="text-sm font-bold tracking-tight text-primary">{`от ${price.toLocaleString()}₽`}</p>}
            </div>
        )
    }