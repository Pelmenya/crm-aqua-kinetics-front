import React, { useState, useMemo, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import cn from 'classnames';

import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { useGetAddressSuggestionsQuery, useGetCoordinatesQuery } from '../api/address-api';
import { setRealEstateAddress, setRealEstateCoordinates } from '@/features/real-estate/model/real-estate-slice';
import { getRealEstateAddress, getRealEstateCoordinates } from '@/features/real-estate/model/real-estate-selectors';
import { Map } from '@/shared/ui/components/map/map';

export const AddressSearchWithMap = () => {
    const dispatch = useAppDispatch();
    const realEstateAddressFromRedux = useAppSelector(getRealEstateAddress);
    const realEstateCoordinatesFromRedux = useAppSelector(getRealEstateCoordinates);

    const [query, setQuery] = useState(realEstateAddressFromRedux || '');
    const [selectedAddress, setSelectedAddress] = useState<string | null>(realEstateAddressFromRedux);
    const [coordinates, setCoordinates] = useState(realEstateCoordinatesFromRedux);

    const { data: suggestionsData } = useGetAddressSuggestionsQuery(query);
    const { data: coordinatesData } = useGetCoordinatesQuery(selectedAddress || '', {
        skip: !selectedAddress,
    });

    const suggestions = suggestionsData?.suggestions || [];

    const debouncedSetQuery = useMemo(() => _.debounce(setQuery, 300), []);

    useEffect(() => {
        if (coordinatesData?.coordinates) {
            setCoordinates(coordinatesData.coordinates);
            dispatch(setRealEstateCoordinates(coordinatesData.coordinates));
        }
    }, [coordinatesData, dispatch]);

    useEffect(() => {
        if (selectedAddress !== realEstateAddressFromRedux) {
            dispatch(setRealEstateAddress(selectedAddress));
        }
    }, [selectedAddress, realEstateAddressFromRedux, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetQuery(event.target.value);
    };

    const handleSelect = (value: string) => {
        setQuery(value);
        setSelectedAddress(value);
    };

    const commonClasses = 'rounded-box peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm';
    const labelClasses = cn(
        'bg-base-100 block relative overflow-hidden rounded-lg border border-gray-200 px-3 pt-3 shadow-sm w-full transition duration-300 ease-in-out',
        'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
    );

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="relative container">
                <Combobox value={query} onChange={handleSelect}>
                    <div className={labelClasses}>
                        <Combobox.Input
                            onChange={handleChange}
                            className={commonClasses}
                            placeholder="Введите адрес"
                        />
                        <span
                            className={cn(
                                'absolute left-3 text-sm transition-all duration-100 ease-in-out pointer-events-none',
                                {
                                    'top-3 text-xs': query,
                                    'top-1/2 transform -translate-y-1/2 peer-focus:top-3 peer-focus:text-xs':
                                        query !== '' || !query,
                                }
                            )}
                        >
                            Введите адрес
                        </span>
                    </div>
                    {query && suggestions.length === 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            <div className="p-2">
                                Нет подходящей подсказки
                            </div>
                        </Combobox.Options>
                    )}
                    {suggestions.length > 0 && (
                        <Combobox.Options className="absolute z-10 bg-base-100 border border-primary rounded-md shadow-lg max-h-60 mt-1 w-full overflow-auto">
                            {suggestions.map((suggestion) => (
                                <Combobox.Option
                                    key={suggestion.sign}
                                    value={suggestion.value}
                                    className="cursor-pointer select-none relative hover:bg-blue-100"
                                >
                                    {({ active }) => (
                                        <span
                                            className={`block py-2 pl-3 pr-4 ${
                                                active ? 'font-bold bg-blue-100' : 'font-normal'
                                            } whitespace-normal break-words`}
                                        >
                                            {suggestion.value}
                                        </span>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </Combobox>
            </div>
            {coordinates && (
                <div className="grid w-full mt-4">
                    <Map coordinates={[coordinates.latitude, coordinates.longitude]} />
                    <p className='mt-2'>Координаты: {coordinates.latitude + ', ' + coordinates.longitude}</p>
                </div>
            )}
        </div>
    );
};
