// src/components/ProductList.tsx
import { useGetProductsQuery } from '@/features/moy-sklad/api/moy-sklad-api';
import React from 'react';
import { ProductCard } from '../product-card/product-card';

export const ProductList: React.FC = () => {
    const { data: products, error, isLoading } = useGetProductsQuery({limit: 200});

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="product-list">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
