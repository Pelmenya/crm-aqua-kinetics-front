import { FC } from "react";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { Page } from "@/shared/ui/components/page/page";
import { InputField } from "@/shared/ui/components/input-field/input-field";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type TProfileFormInputs = {
    carModel: string;
    carNumber: string;
};

const schema = yup.object().shape({
    carModel: yup.string(),
    carNumber: yup.string(),
});


export const ServiceProfilePage: FC = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TProfileFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit= () => {

    }

    return (
        <Page back={true}>
            <div className="bg-base-300 w-full h-full">
                <FormWithTitle
                    title="Ваш профиль"
                    onSubmit={handleSubmit(onSubmit)}
                    submitButtonText="Сохранить"
                    isLoading={false}
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

                </FormWithTitle>
            </div>
        </Page>
    );
};
