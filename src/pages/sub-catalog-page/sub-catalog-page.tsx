import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";
import { useGetSubGroupsQuery, useGetProductsByGroupQuery, useGetGroupPathQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { useParams } from "react-router-dom";
import { ProductList } from "@/features/moy-sklad/ui/product-list/product-list";
import { Breadcrumbs } from "@/shared/ui/components/breadcrumbs/breadcrumbs";

export const SubCatalogPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: categoryPath, isLoading: isLoadingPath } = useGetGroupPathQuery(id || '');
    const { data: subGroups, error: subGroupsError, isLoading: isLoadingSubGroups } = useGetSubGroupsQuery(id || '');
    const { data: products, error: productsError, isLoading: isLoadingProducts } = useGetProductsByGroupQuery(id || '');

    // Формируем хлебные крошки
    const breadcrumbs = [
        { name: 'Каталог', path: '/catalog' },
        ...(categoryPath ? categoryPath.map(item => ({
            name: item.groupName || '',
            path: `/sub-catalog/${item.id}`
        })) : [])
    ];

    return (
        <Page footer={true} className="bg-base-300 pt-2 space-y-2">
            {subGroupsError && <div>Error loading subgroups</div>}
            {isLoadingPath ? (
                <div>Loading breadcrumbs...</div>
            ) : (
                <Breadcrumbs items={breadcrumbs}/>
            )}
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
    );
}
