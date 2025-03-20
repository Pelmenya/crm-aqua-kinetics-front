import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";

export const CatalogPage: FC = () => {
    return (
        <Page footer={true} className="bg-base-300">
            <h1 className="block w-full text-center py-4 text-xl font-bold">Каталог</h1>
            <GroupList onSelectGroup={() => {}} />
        </Page>)
}