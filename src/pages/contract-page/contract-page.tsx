import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const ContractPage:FC = () => {
    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-4">
            <div className="px-4">
                <h1 className="block w-full text-center pb-4 text-lg font-bold">Контракт</h1>
            </div>
        </Page>)
}