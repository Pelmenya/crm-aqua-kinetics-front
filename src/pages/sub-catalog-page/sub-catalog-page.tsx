import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";
import { useGetSubGroupsQuery, useGetProductsByGroupQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { useParams } from "react-router-dom";
import { ProductList } from "@/features/moy-sklad/ui/product-list/product-list";

export const SubCatalogPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: subGroups, error: subGroupsError, isLoading: isLoadingSubGroups } = useGetSubGroupsQuery(id || '');
    const { data: products, error: productsError, isLoading: isLoadingProducts } = useGetProductsByGroupQuery(id || '');

    return (
        <Page footer={true} className="bg-base-300">
            {subGroupsError && <div>Error loading subgroups</div>}
            <GroupList 
                cardType="sub" 
                groups={subGroups || []} 
                error={subGroupsError} 
                isLoading={isLoadingSubGroups} 
                title="Подкатегории"
            />
            <ProductList 
                products={products || []} 
                isLoading={isLoadingProducts} 
                error={productsError}
                title="Товары"
            />
        </Page>
    )
}
