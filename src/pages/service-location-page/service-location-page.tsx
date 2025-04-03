import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { AddressSearchWithMap } from "@/features/address-search/ui/address-search-with-map";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { setAddress, setCoordinates } from "@/entities/account-service/model/account-service-slice";
import { Page } from "@/shared/ui/components/page/page";
import { TCreateAccountService, useCreateOrUpdateAccountServiceMutation, useGetAccountServiceByUserQuery } from "@/entities/account-service/api/account-service-api";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Loading } from "@/shared/ui/components/loading/loading";

export const ServiceLocationPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accountServiceFromRedux = useAppSelector(getAccountServiceState);
    const [createAccountService, { isLoading }] = useCreateOrUpdateAccountServiceMutation();

    const { handleSubmit } = useForm();

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
        }
    }, [accountServiceFromBack, dispatch]);

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
                    isDisabledSubmitBtn={!accountServiceFromRedux.address}
                >
                    <AddressSearchWithMap
                        query={accountServiceFromRedux.address || ''}
                        selectedAddress={accountServiceFromRedux.address}
                        coordinates={accountServiceFromRedux.coordinates || null}
                        isViewCoordinates={false}
                        onQueryChange={(query) => dispatch(setAddress(query))}
                        onSelectAddress={(address) => dispatch(setAddress(address))}
                        onCoordinatesChange={(coords) => dispatch(setCoordinates(coords))}
                        zoom={17}
                    />
                </FormWithTitle>
            </div>
        </Page>
    );
};
