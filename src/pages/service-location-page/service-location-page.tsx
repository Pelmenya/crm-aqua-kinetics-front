import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { setAddress, setCoordinates, setRadiusKm } from "@/entities/account-service/model/account-service-slice";
import { Page } from "@/shared/ui/components/page/page";
import { TCreateAccountService, useCreateOrUpdateAccountServiceMutation } from "@/entities/account-service/api/account-service-api";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { RangeSlider } from "@/shared/ui/components/range-slider.tsx/range-slider";
import { useNavigate } from "react-router-dom";

export type TLocationFormInputs = {
    radiusKm: number;
};

const schema = yup.object().shape({
    radiusKm: yup
        .number()
        .nullable()
        .typeError("Значение должно быть числом")
        .required("Радиус не должен быть пустым")
        .min(0, "Радиус не может быть отрицательным"),
});

export const ServiceLocationPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accountService = useAppSelector(getAccountServiceState);
    const [createAccountService, { isLoading }] = useCreateOrUpdateAccountServiceMutation();

    const { handleSubmit, setValue } = useForm<TLocationFormInputs>({
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
            navigate('/account');

        } catch (error) {
            console.error("Failed to create account service", error);
        }
    };

    useEffect(() => {
        if (accountService.radiusKm !== undefined && accountService.radiusKm !== null) {
            setValue('radiusKm', accountService.radiusKm, { shouldValidate: true });
        }
    }, [accountService.radiusKm, setValue]);

    // Обработка изменения значения радиуса
    const handleRadiusChange = (value: number) => {
        setValue('radiusKm', value);
        dispatch(setRadiusKm(value));
    };

    return (
        <Page back={true}>
            <div className="bg-base-300 w-full h-full">
                <FormWithTitle
                    title="Ваша локация"
                    onSubmit={handleSubmit(onSubmit)}
                    submitButtonText="Сохранить"
                    isLoading={isLoading}
                    isDisabledSubmitBtn={!accountService.address || !accountService.radiusKm}
                >
                    <AddressSearchWithMap
                        query={accountService.address || ''}
                        selectedAddress={accountService.address}
                        coordinates={accountService.coordinates || null}
                        isViewCoordinates={false}
                        radiusKm={accountService.radiusKm || 0}
                        onQueryChange={(query) => dispatch(setAddress(query))}
                        onSelectAddress={(address) => dispatch(setAddress(address))}
                        onCoordinatesChange={(coords) => dispatch(setCoordinates(coords))}
                        zoom={7}
                    />
                    <div className="grid w-full">
                        <RangeSlider
                            value={accountService.radiusKm || 0}
                            onChange={handleRadiusChange}
                            min={0}
                            max={150} // Укажите максимальное значение радиуса
                            label="Радиус выезда"
                            unit="км."
                        />
                    </div>
                </FormWithTitle>
            </div>
        </Page >
    );
};
