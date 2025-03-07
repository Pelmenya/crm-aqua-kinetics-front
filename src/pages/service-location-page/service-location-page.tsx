import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { setAddress, setCoordinates, setRadiusKm } from "@/entities/account-service/model/account-service-slice";
import { Page } from "@/shared/ui/components/page/page";
import { TCreateAccountService, useCreateOrUpdateAccountServiceMutation } from "@/entities/account-service/api/account-service-api";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export type TLocationFormInputs = {
    radiusKm: number;
};

const schema = yup.object().shape({
    radiusKm: yup
        .number()
        .nullable() // Разрешаем null значение
        .typeError("Значение должно быть числом")
        .required("Радиус не должен быть пустым")
        .min(0, "Радиус не может быть отрицательным"),
});

export const ServiceLocationPage: FC = () => {
    const dispatch = useAppDispatch();
    const accountService = useAppSelector(getAccountServiceState);
    const [createAccountService] = useCreateOrUpdateAccountServiceMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TLocationFormInputs>({
        resolver: yupResolver(schema),
    });
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    const onSubmit = async () => {
        try {
            const newAccountService: TCreateAccountService = {
                ...accountService,
                coordinates: accountService.coordinates ? {
                    type: 'Point',
                    coordinates: [accountService.coordinates.longitude, accountService.coordinates.latitude]
                } : null
            };

            await createAccountService({ newAccountService, authKey }).unwrap();
            console.log("Account service created successfully");
        } catch (error) {
            console.error("Failed to create account service", error);
        }
    };

    useEffect(() => {
        if (accountService.radiusKm !== undefined && accountService.radiusKm !== null) {
            setValue('radiusKm', accountService.radiusKm, { shouldValidate: true });
        }
    }, [accountService.radiusKm, setValue]);

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
                    query={accountService.address || ''}
                    selectedAddress={accountService.address}
                    coordinates={accountService.coordinates || null}
                    radiusKm={accountService.radiusKm || 0}
                    onQueryChange={(query) => dispatch(setAddress(query))}
                    onSelectAddress={(address) => dispatch(setAddress(address))}
                    onCoordinatesChange={(coords) => dispatch(setCoordinates(coords))}
                    zoom={7}
                />
            </FormWithTitle>
        </Page>
    );
};
