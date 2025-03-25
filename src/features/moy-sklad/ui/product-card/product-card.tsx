// features/moy-sklad/ui/product-card/product-card.tsx

import { FC } from "react";
import { TProduct } from "../../model/types/t-product";

export const ProductCard: FC<{ product: TProduct }> = ({ product }) => {
    
    return (
                <div key={product.id} className="border p-4 w-full md:w-1/2 lg:w-1/3">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Цена: {78000}</p>
                </div>
    );
};
