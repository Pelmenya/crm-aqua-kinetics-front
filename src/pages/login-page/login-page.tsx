import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { emailRegex } from "@/shared/lib/regex/regex";

export type TLoginFormInputs = {
  email: string;
  password: string;
}

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
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full flex flex-col gap-4 items-center justify-center">
        <h1>Авторизация</h1>
        <InputField
          label="Почта"
          type="email"
          placeholder="Почта"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <InputField
          label="Пароль"
          type="password"
          placeholder="Пароль"
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <button type="submit" className="btn btn-primary w-full">Войти</button>
      </form>
    </Page>
  );
}
