import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Page } from "@/shared/ui/components/page/page";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { ServiceWeekly } from "./components/service-weekly/service-weekly";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { 
    TCreateAccountService, 
    useCreateOrUpdateAccountServiceMutation, 
    useGetAccountServiceByUserQuery 
} from "@/entities/account-service/api/account-service-api";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { setCarModel, setCarNumber } from "@/entities/account-service/model/account-service-slice";
import { Loading } from "@/shared/ui/components/loading/loading";

// Регулярное выражение для проверки российского номера (латиница и кириллица)
const russianCarNumberRegex = /^[ABEKMHOPCTYXАВЕКМНОРСТУХ]\d{3}[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}\s?\d{2,3}$/;

export type TProfileFormInputs = {
    carModel?: string;
    carNumber?: string;
};

const schema = yup.object().shape({
    carModel: yup.string(),
    carNumber: yup
        .string()
        .matches(russianCarNumberRegex, "Некорректный формат номера автомобиля"),
});

export const ServiceProfilePage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accountServiceFromRedux = useAppSelector(getAccountServiceState);
    const [createAccountService, { isLoading }] = useCreateOrUpdateAccountServiceMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TProfileFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            carModel: accountServiceFromRedux.carModel || '',
            carNumber: accountServiceFromRedux.carNumber || ''
        }
    });

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
            if (accountServiceFromBack.carModel !== accountServiceFromRedux.carModel) {
                dispatch(setCarModel(accountServiceFromBack.carModel || ''));
                setValue('carModel', accountServiceFromBack.carModel || '');
            }
            if (accountServiceFromBack.carNumber !== accountServiceFromRedux.carNumber) {
                dispatch(setCarNumber(accountServiceFromBack.carNumber || ''));
                setValue('carNumber', accountServiceFromBack.carNumber || '');
            }
        }
    }, [accountServiceFromBack, accountServiceFromRedux, dispatch, setValue]);

    const onSubmit = async (data: TProfileFormInputs) => {
        try {
            const newAccountService: TCreateAccountService = {
                ...accountServiceFromRedux,
                coordinates: accountServiceFromRedux.coordinates ? {
                    type: 'Point',
                    coordinates: [accountServiceFromRedux.coordinates.longitude, accountServiceFromRedux.coordinates.latitude]
                } : null,
                carModel: data.carModel || null,
                carNumber: data.carNumber || null,
            };

            const account = await createAccountService({ newAccountService, authKey }).unwrap();
            console.log(account);
            navigate('/account');
        } catch (error) {
            console.log("Failed to create account service", error);
        }
    };

    if (isFetching) {
        return <Loading color="text-primary" size="loading-xs" type="loading-infinity" />;
    }

    return (
        <Page back={true}>
            <div className="bg-base-300 w-full h-full">
                <FormWithTitle
                    title="Ваш профиль"
                    onSubmit={handleSubmit(onSubmit)}
                    submitButtonText="Сохранить"
                    isLoading={isLoading}
                    isDisabledSubmitBtn={false}
                >
                    <InputField
                        type="text"
                        name="carModel"
                        register={register}
                        error={errors.carModel?.message}
                        placeholder="Модель авто"
                    />
                    <InputField
                        type="text"
                        name="carNumber"
                        register={register}
                        error={errors.carNumber?.message}
                        placeholder="Номер авто"
                    />
                    <div className="px-4">
                        <ServiceWeekly />
                    </div>
                </FormWithTitle>
            </div>
        </Page>
    );
};
