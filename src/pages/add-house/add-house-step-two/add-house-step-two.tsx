import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { Link } from "@/processes/link/link";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { FC, useEffect } from "react";
import { getRealEstateAddress } from "../model/real-estate-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { setProgress } from "../model/real-estate-slice";

export const AddHouseStepTwo: FC = () => {
    const dispatch = useAppDispatch();
    const address = useAppSelector(getRealEstateAddress);

    useEffect(() => {
        if (address) {
            dispatch(setProgress(80))
        } else {
            dispatch(setProgress(60))
        }
    }, [address])

    return (
        <div className="w-full h-full pt-6 pb-4 px-4 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Адрес</h3>
                <AddressSearchWithMap />
            </div>
            {address
                ? <Link to='/add-house/step-3' className="btn btn-primary">Далее</Link>
                : <button className="btn btn-primary" disabled>Далее</button>
            }
        </div>
    )
}