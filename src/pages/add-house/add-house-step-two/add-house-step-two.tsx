import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { Link } from "@/processes/link/link";
import { FC } from "react";

export const AddHouseStepTwo: FC = () => {

    return (
        <div className="w-full h-full pt-6 pb-4 px-4 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Адрес</h3>
                <AddressSearchWithMap />
            </div>
            <Link to='/add-house/step-3' className="btn btn-primary">Далее</Link>
        </div>
    )
}