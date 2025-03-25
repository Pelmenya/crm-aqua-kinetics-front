// features/moy-sklad/ui/product-list/product-list.tsx

import { FC } from "react";
import { TProduct } from "../../model/types/t-product";
import { Loading } from "@/shared/ui/components/loading/loading";
import { ProductCard } from "../product-card/product-card";

export const ProductList: FC<{ products: TProduct[], isLoading: boolean }> = ({ products, isLoading }) => {
    if (isLoading) {
        return (
            <Loading className="w-full flex items-center justify-center" color="text-primary" size="loading-xs" type="loading-infinity" />
        )
    }
    return (
        <div className="flex flex-wrap gap-4 px-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};