import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { Link } from "@/processes/link/link";
import { FC, useState, useEffect } from "react";
import { getRealEstateAddress, getRealEstateCoordinates } from "../../model/real-estate-selectors";
import { setProgress, setRealEstateAddress, setRealEstateCoordinates } from "../../model/real-estate-slice";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";

export const AddHouseStepTwo: FC = () => {
    const dispatch = useAppDispatch();
    const addressFromRedux = useAppSelector(getRealEstateAddress);
    const coordinatesFromRedux = useAppSelector(getRealEstateCoordinates);

    const [query, setQuery] = useState(addressFromRedux || '');
    const [selectedAddress, setSelectedAddress] = useState<string | null>(addressFromRedux);
    const [coordinates, setCoordinates] = useState(coordinatesFromRedux);

    useEffect(() => {
        if (selectedAddress !== addressFromRedux) {
            dispatch(setRealEstateAddress(selectedAddress));
        }
    }, [selectedAddress, addressFromRedux, dispatch]);

    useEffect(() => {
        if (coordinates !== coordinatesFromRedux) {
            dispatch(setRealEstateCoordinates(coordinates));
        }
    }, [coordinates, coordinatesFromRedux, dispatch]);

    useEffect(() => {
        if (addressFromRedux) {
            dispatch(setProgress(80));
        } else {
            dispatch(setProgress(60));
        }
    }, [addressFromRedux, dispatch]);

    return (
        <div className="w-full h-full pt-6 pb-4 px-4 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Адрес</h3>
                <AddressSearchWithMap
                    query={query}
                    selectedAddress={selectedAddress}
                    coordinates={coordinates}
                    onQueryChange={setQuery}
                    onSelectAddress={setSelectedAddress}
                    onCoordinatesChange={setCoordinates}
                />
            </div>
            {addressFromRedux
                ? <Link to='/add-house/step-3' className="btn btn-primary">Далее</Link>
                : <button className="btn btn-primary" disabled>Далее</button>
            }
        </div>
    );
};
