import { FC } from "react";
import { FormWithTitle } from "@/shared/ui/components/form-with-title/form-with-title";
import { Page } from "@/shared/ui/components/page/page";


export const ServiceProfilePage: FC = () => {

    return (
        <Page back={true}>
            <div className="bg-base-300 w-full h-full">
                <FormWithTitle
                    title="Ваш профиль"
                    onSubmit={() => {}}
                    submitButtonText="Сохранить"
                    isLoading={false}
                    isDisabledSubmitBtn={false}
                >
                    <></>
                </FormWithTitle>
            </div>
        </Page>
    );
};
