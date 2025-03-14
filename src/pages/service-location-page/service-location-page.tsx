import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { setAddress, setCoordinates, setRadiusKm } from "@/entities/account-service/model/account-service-slice";
import { Page } from "@/shared/ui/components/page/page";
import { TCreateAccountService, useCreateOrUpdateAccountServiceMutation, useGetAccountServiceByUserQuery } from "@/entities/account-service/api/account-service-api";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { RangeSlider } from "@/shared/ui/components/range-slider.tsx/range-slider";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Loading } from "@/shared/ui/components/loading/loading";

export type TLocationFormInputs = {
    radiusKm: number;
};

export const ServiceLocationPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accountServiceFromRedux = useAppSelector(getAccountServiceState);
    const [createAccountService, { isLoading }] = useCreateOrUpdateAccountServiceMutation();

    const { handleSubmit, setValue } = useForm<TLocationFormInputs>();

    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    const { data: accountServiceFromBack, refetch, isFetching } = useGetAccountServiceByUserQuery(authKey, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (authKey) {
            refetch();
        }
    }, [authKey, refetch]);

    useEffect(() => {
        if (accountServiceFromBack) {
            // Обновляем только если данные изменились
            if (accountServiceFromBack.address !== accountServiceFromRedux.address) {
                dispatch(setAddress(accountServiceFromBack.address || null));
            }
            if (
                accountServiceFromBack.coordinates &&
                (accountServiceFromBack.coordinates.latitude !== accountServiceFromRedux.coordinates?.latitude ||
                    accountServiceFromBack.coordinates.longitude !== accountServiceFromRedux.coordinates?.longitude)
            ) {
                dispatch(setCoordinates(accountServiceFromBack.coordinates));
            }
            if (accountServiceFromBack.radiusKm !== accountServiceFromRedux.radiusKm) {
                dispatch(setRadiusKm(accountServiceFromBack.radiusKm));
                setValue('radiusKm', Number(accountServiceFromBack.radiusKm));
            }
        }
    }, [accountServiceFromBack, dispatch, setValue]);

    const onSubmit = async () => {
        try {
            const newAccountService: TCreateAccountService = {
                ...accountServiceFromRedux,
                coordinates: accountServiceFromRedux.coordinates ? {
                    type: 'Point',
                    coordinates: [accountServiceFromRedux.coordinates.longitude, accountServiceFromRedux.coordinates.latitude]
                } : null,
                workDays: null,
                calendarMonths: null,
            };

           const account = await createAccountService({ newAccountService, authKey }).unwrap();
           console.log(account);
            navigate('/account');

        } catch (error) {
            console.log("Failed to create account service", error);
        }
    };

    const handleRadiusChange = (value: number) => {
        setValue('radiusKm', value);
        dispatch(setRadiusKm(value));
    };

    // Проверка состояния загрузки
    if (isFetching) {
        return <Loading color="text-primary" size="loading-xs" type="loading-infinity" />;
    }

    return (
        <Page back={true}>
            <div className="bg-base-300 w-full h-full">
                <FormWithTitle
                    title="Ваша локация"
                    onSubmit={handleSubmit(onSubmit)}
                    submitButtonText="Сохранить"
                    isLoading={isLoading}
                    isDisabledSubmitBtn={!accountServiceFromRedux.address || !accountServiceFromRedux.radiusKm}
                >
                    <AddressSearchWithMap
                        query={accountServiceFromRedux.address || ''}
                        selectedAddress={accountServiceFromRedux.address}
                        coordinates={accountServiceFromRedux.coordinates || null}
                        isViewCoordinates={false}
                        radiusKm={accountServiceFromRedux.radiusKm || 0}
                        onQueryChange={(query) => dispatch(setAddress(query))}
                        onSelectAddress={(address) => dispatch(setAddress(address))}
                        onCoordinatesChange={(coords) => dispatch(setCoordinates(coords))}
                        zoom={7}
                    />
                    <div className="grid w-full">
                        <RangeSlider
                            value={accountServiceFromRedux.radiusKm || 0}
                            onChange={handleRadiusChange}
                            min={0}
                            max={150}
                            label="Радиус выезда"
                            unit="км."
                        />
                    </div>
                </FormWithTitle>
            </div>
        </Page>
    );
};
