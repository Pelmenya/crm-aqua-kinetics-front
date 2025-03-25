// features/moy-sklad/ui/product-list/product-list.tsx

import { FC } from "react";
import { TProduct } from "../../model/types/t-product";
import { Loading } from "@/shared/ui/components/loading/loading";
import { ProductCard } from "../product-card/product-card";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const ProductList: FC<{
    products: TProduct[],
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    title?: string;
}> = ({
    products,
    isLoading,
    error,
    title
}) => {
        if (isLoading) return (
            <Loading
                className="w-full h-full flex items-center justify-center"
                color="text-primary"
                size="loading-xs"
                type="loading-infinity"
            />);

        if (error) return <div>Error loading groups</div>;

        return (
            <>
                {title && products.length > 0 ? <h2 className="block w-full text-center py-4 text-xl font-bold">{title}</h2> : null}
                <div className="grid grid-cols-2 gap-2 px-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </>
        );
    };