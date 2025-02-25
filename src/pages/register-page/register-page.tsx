import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import { emailRegex, phoneRegex } from "@/shared/lib/regex/regex";

export type TRegisterFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("Имя обязательно"),
  lastName: yup.string().required("Фамилия обязательна"),
  phone: yup.string().matches(phoneRegex, "Неверный формат телефона").required("Телефон обязателен"),
  email: yup.string().matches(emailRegex, "Неверный формат почты").required("Почта обязательна"),
});

export const RegisterPage: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TRegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TRegisterFormInputs) => {
    console.log(data);
    // Обработка данных формы
  };

  return (
    <Page back={true}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full flex flex-col gap-4 items-center justify-center">
        <h1>Регистрация</h1>
        <InputField
          label="Имя"
          type="text"
          placeholder="Имя"
          register={register}
          name="firstName"
          error={errors.firstName?.message}
        />
        <InputField
          label="Фамилия"
          type="text"
          placeholder="Фамилия"
          register={register}
          name="lastName"
          error={errors.lastName?.message}
        />
        <InputField
          label="Телефон"
          type="tel"
          placeholder="Телефон"
          register={register}
          name="phone"
          error={errors.phone?.message}
        />
        <InputField
          label="Почта"
          type="email"
          placeholder="Почта"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <button type="submit" className="btn btn-primary w-full">Зарегистрироваться</button>
      </form>
    </Page>
  );
}