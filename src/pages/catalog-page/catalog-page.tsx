import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";
import { useGetTopLevelGroupsQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { CatalogHeader } from "@/widgets/catalog-header/catalog-header";

export const CatalogPage: FC = () => {
    const { data, error, isLoading } = useGetTopLevelGroupsQuery();

    return (
        <Page footer={true} className="bg-base-300">
            <CatalogHeader />
            <h1 className="block w-full text-center pb-4 text-xl font-bold">Каталог</h1>
            <GroupList cardType="top" groups={data || []} error={error} isLoading={isLoading}/>
        </Page>)
}