import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getLocationState } from "@/entities/location/model/location-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { setLocationAddress, setLocationCoordinates, setRadiusKm } from "@/entities/location/model/location-slice";
import { Page } from "@/shared/ui/components/page/page";

export type TLocationFormInputs = {
    radiusKm: number;
};

const schema = yup.object().shape({
    radiusKm: yup.number().required("Радиус выезда в км").min(0, "Радиус не может быть отрицательным"),
});

export const LocationPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useAppSelector(getLocationState);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TLocationFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            radiusKm: location.radiusKm,
        }
    });

    const onSubmit = async (data: TLocationFormInputs) => {
        console.log(data);
        dispatch(setRadiusKm(data.radiusKm));
    };

    useEffect(() => {
        if (location.radiusKm) {
            setValue('radiusKm', location.radiusKm);
        }
    }, [location.radiusKm, setValue]);

    return (
        <Page back={true}>
            <FormWithTitle title="Ваша локация" onSubmit={handleSubmit(onSubmit)} submitButtonText="Сохранить">
                <AddressSearchWithMap
                    query={location.address || ''}
                    selectedAddress={location.address}
                    coordinates={location.coordinates}
                    radiusKm={location.radiusKm}
                    onQueryChange={(query) => dispatch(setLocationAddress(query))}
                    onSelectAddress={(address) => dispatch(setLocationAddress(address))}
                    onCoordinatesChange={(coords) => dispatch(setLocationCoordinates(coords))}
                    zoom={7}
                />
                <InputField
                    type="text"
                    placeholder="Введите радиус выезда в км."
                    register={register}
                    name="radiusKm"
                    error={errors.radiusKm?.message || ""}
                />
            </FormWithTitle>
        </Page>
    );
}
