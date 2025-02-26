import { Page } from "@/shared/ui/components/page/page";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { emailRegex, phoneRegex } from "@/shared/lib/regex/regex";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { usePostAuthMutation } from "@/features/auth/api/auth-api";

export type TRegisterFormInputs = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
};

const schema = yup.object().shape({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    phone: yup.string().matches(phoneRegex, "Пример: +79999999999").required("Телефон обязателен"),
    email: yup.string().matches(emailRegex, "Неверный формат почты").required("Почта обязательна"),
    password: yup.string().required("Пароль обязателен"),
});

export const RegisterPage: FC = () => {
    const lp = useLaunchParams();
    const [postAuth, { data: user }] = usePostAuthMutation();

    useEffect(() => {
        if (lp.initDataRaw) {
            postAuth(lp.initDataRaw).catch(console.error);
        }
    }, [lp.initDataRaw, postAuth]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TRegisterFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: TRegisterFormInputs) => {
        console.log(data);
        // Обработка данных формы
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
