import React, { useMemo, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import _ from 'lodash';
import { useGetAddressSuggestionsQuery, useGetCoordinatesQuery } from '../api/address-api';
import { Map } from '@/shared/ui/components/map/map';

type TAddressSearchWithMapProps = {
    query: string;
    selectedAddress: string | null;
    coordinates: { latitude: number; longitude: number } | null;
    radiusKm?: number;
    zoom?: number;
    onQueryChange: (query: string) => void;
    onSelectAddress: (address: string) => void;
    onCoordinatesChange: (coordinates: { latitude: number; longitude: number } | null) => void;
};

export const AddressSearchWithMap: React.FC<TAddressSearchWithMapProps> = ({
    query,
    selectedAddress,
    coordinates,
    radiusKm,
    zoom,
    onQueryChange,
    onSelectAddress,
    onCoordinatesChange,
}) => {
    const { data: suggestionsData } = useGetAddressSuggestionsQuery(query);
    const { data: coordinatesData } = useGetCoordinatesQuery(selectedAddress || '', {
        skip: !selectedAddress,
    });

    const suggestions = suggestionsData?.suggestions || [];

    const debouncedOnQueryChange = useMemo(() => _.debounce(onQueryChange, 300), [onQueryChange]);

    useEffect(() => {
        if (coordinatesData?.coordinates) {
            onCoordinatesChange(coordinatesData.coordinates);
        }
    }, [coordinatesData, onCoordinatesChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedOnQueryChange(event.target.value);
    };

    const handleSelect = (value: string) => {
        onQueryChange(value);
        onSelectAddress(value);
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="relative container">
                <Combobox value={query} onChange={handleSelect}>
                    <Combobox.Input
                        onChange={handleChange}
                        className="input input-primary w-full"
                        placeholder="Введите адрес"
                    />
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
                                            className={`block py-2 pl-3 pr-4 ${active ? 'font-bold bg-blue-100' : 'font-normal'
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
                    <Map coordinates={[coordinates.latitude, coordinates.longitude]} radiusKm={radiusKm} zoom={zoom}/>
                    <p className='mt-2'>Координаты: {coordinates.latitude + ', ' + coordinates.longitude}</p>
                </div>
            )}
        </div>
    );
};
