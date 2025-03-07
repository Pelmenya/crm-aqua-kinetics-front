import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getLocationState } from "@/entities/account-service/model/account-service-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { setAddress, setCoordinates, setRadiusKm } from "@/entities/account-service/model/account-service-slice";
import { Page } from "@/shared/ui/components/page/page";

export type TLocationFormInputs = {
    radiusKm: number;
};

const schema = yup.object().shape({
    radiusKm: yup
        .number()
        .nullable() // Разрешаем null значение
        .transform((value, originalValue) => originalValue.trim() === '' ? null : value) // Преобразуем пустую строку в null
        .typeError("Значение должно быть числом")
        .required("Радиус не должен быть пустым")
        .min(0, "Радиус не может быть отрицательным"),
});

export const  ServiceLocationPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useAppSelector(getLocationState);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TLocationFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: TLocationFormInputs) => {
        console.log(data);
        if (data.radiusKm !== null) {
            dispatch(setRadiusKm(data.radiusKm));
        }
    };

    useEffect(() => {
        if (location.radiusKm !== undefined && location.radiusKm !== null) {
            setValue('radiusKm', location.radiusKm, { shouldValidate: true });
        }
    }, [location.radiusKm, setValue]);

    // Функция для обработки ввода в поле radiusKm
    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        const numericValue = value === "" ? null : Number(value);
        setValue('radiusKm', numericValue as number);
        dispatch(setRadiusKm(numericValue));
    };

    return (
        <Page back={true}>
            <FormWithTitle title="Ваша локация" onSubmit={handleSubmit(onSubmit)} submitButtonText="Сохранить">
                <InputField
                    type="text"
                    placeholder="Введите радиус выезда в км."
                    register={register}
                    name="radiusKm"
                    error={errors.radiusKm?.message || ""}
                    onInput={handleRadiusChange}
                />
                <AddressSearchWithMap
                    query={location.address || ''}
                    selectedAddress={location.address}
                    coordinates={location.coordinates}
                    radiusKm={location.radiusKm || 0}
                    onQueryChange={(query) => dispatch(setAddress(query))}
                    onSelectAddress={(address) => dispatch(setAddress(address))}
                    onCoordinatesChange={(coords) => dispatch(setCoordinates(coords))}
                    zoom={7}
                />
            </FormWithTitle>
        </Page>
    );
};
