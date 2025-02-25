import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { emailRegex } from "@/shared/lib/regex/regex";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";

export type TLoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().matches(emailRegex, "Неверный формат почты").required("Почта обязательна"),
  password: yup.string().required("Пароль обязателен"),
});

export const LoginPage: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TLoginFormInputs) => {
    console.log(data);
    // Обработка данных формы
  };

  return (
    <Page back={true}>
      <FormWithTitle title="Авторизация" onSubmit={handleSubmit(onSubmit)} submitButtonText="Войти">
        <InputField
          type="email"
          placeholder="Почта"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <InputField
          type="password"
          placeholder="Пароль"
          register={register}
          name="password"
          error={errors.password?.message}
        />
      </FormWithTitle>
    </Page>
  );
}