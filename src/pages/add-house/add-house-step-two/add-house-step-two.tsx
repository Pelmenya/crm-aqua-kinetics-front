import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { FC } from "react";

export const AddHouseStepTwo: FC = () => {

    return (
        <div className="w-full pt-6 pb-4 px-4 flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Адрес</h3>
            <AddressSearchWithMap />
            <button className="btn btn-primary">Сохранить</button>
        </div>
    )
}