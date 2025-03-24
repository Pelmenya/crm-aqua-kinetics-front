import { FC } from "react";
import { Page } from "@/shared/ui/components/page/page";
import { GroupList } from "@/features/moy-sklad/ui/group-list/group-list";
import { useNavigate, useParams } from "react-router-dom";

export const SubCatalogPage: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    
    return (
        <Page footer={true} className="bg-base-300">
            <h1 className="block w-full text-center py-4 text-xl font-bold">Каталог</h1>
            
        </Page>)
}