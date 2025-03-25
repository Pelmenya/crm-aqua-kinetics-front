import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";
import { useGetSubGroupsQuery, useGetProductsByGroupQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { useParams } from "react-router-dom";
import { ProductList } from "@/features/moy-sklad/ui/product-card/product-card";

export const SubCatalogPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: subGroups, error: subGroupsError, isLoading: isLoadingSubGroups } = useGetSubGroupsQuery(id || '');
    const { data: products, error: productsError, isLoading: isLoadingProducts } = useGetProductsByGroupQuery(id || '');

    console.log(subGroups);
    
    return (
        <Page footer={true} className="bg-base-300">
            <h1 className="block w-full text-center py-4 text-xl font-bold">Подкатегории</h1>
            {subGroupsError && <div>Error loading subgroups</div>}
            <GroupList cardType="sub" groups={subGroups || []} error={subGroupsError} isLoading={isLoadingSubGroups} />

            <h2 className="block w-full text-center py-4 text-lg font-bold">Товары</h2>
            {productsError && <div>Error loading products</div>}
            <ProductList products={products || []} isLoading={isLoadingProducts} />
        </Page>
    )
}
