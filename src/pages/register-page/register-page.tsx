import { Page } from "@/shared/ui/components/page/page";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { emailRegex, phoneRegex } from "@/shared/lib/regex/regex";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { usePutRegisterMutation } from "@/features/auth/api/auth-api";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { getUserState } from "@/entities/user/model/user-selectors";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { setUser } from "@/entities/user/model/user-slice";
import { useNavigate } from "react-router-dom";

export type TRegisterFormInputs = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
};

const schema = yup.object().shape({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    phone: yup.string().matches(phoneRegex, "Пример: +79999999999").required("Телефон обязателен"),
    email: yup.string().matches(emailRegex, "Неверный формат почты").required("Почта обязательна"),
});

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector(getUserState);
    const dispatch = useAppDispatch();
    const lp = useLaunchParams();
    const [putRegister] = usePutRegisterMutation(); // Используем мутацию для обновления пользователя

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TRegisterFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: TRegisterFormInputs) => {
        try {
            const authKey = lp.initDataRaw;
            const updateUser = await putRegister({
                ...data,
                authKey
            }).unwrap();
            dispatch(setUser(updateUser));
            console.log('User updated successfully', updateUser);
            navigate('/account');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        if (user) {
            setValue('firstName', user.first_name);
            setValue('lastName',  user.last_name);
        }
    }, [user, setValue]);

    return (
        <Page back={true}>
            <FormWithTitle title="Регистрация" onSubmit={handleSubmit(onSubmit)} submitButtonText="Зарегистрироваться">
                <InputField
                    type="text"
                    placeholder="Имя"
                    register={register}
                    name="firstName"
                    error={errors.firstName?.message}
                />
                <InputField
                    type="text"
                    placeholder="Фамилия"
                    register={register}
                    name="lastName"
                    error={errors.lastName?.message}
                />
                <InputField
                    type="tel"
                    placeholder="Телефон"
                    register={register}
                    name="phone"
                    error={errors.phone?.message}
                />
                <InputField
                    type="email"
                    placeholder="Почта"
                    register={register}
                    name="email"
                    error={errors.email?.message}
                />
            </FormWithTitle>
        </Page>
    );
}