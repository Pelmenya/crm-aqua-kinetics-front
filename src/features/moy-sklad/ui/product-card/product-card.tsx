// features/moy-sklad/ui/product-list/product-list.tsx

import { FC } from "react";
import { TProduct } from "../../model/types/t-product";
import { Loading } from "@/shared/ui/components/loading/loading";

export const ProductList: FC<{ products: TProduct[], isLoading: boolean }> = ({ products, isLoading }) => {
    if (isLoading) return <Loading className="w-full flex items-center justify-center" color="text-primary" size="loading-xs" type="loading-infinity" />;

    return (
        <div className="flex flex-wrap gap-4 px-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Цена: {78000}</p>
                </div>
            ))}
        </div>
    );
};
