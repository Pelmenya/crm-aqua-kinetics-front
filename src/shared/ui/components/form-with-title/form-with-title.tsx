import { FC, ReactNode } from "react";

export type TFormWithTitleProps = {
    title: string;
    onSubmit: () => void;
    submitButtonText: string;
    children: ReactNode;
    isLoading?: boolean;
    isDisabledSubmitBtn?: boolean;
};

export const FormWithTitle: FC<TFormWithTitleProps> = ({
    title,
    onSubmit,
    submitButtonText,
    children,
    isLoading = false,
    isDisabledSubmitBtn = false,
}) => {
    return (
        <form onSubmit={onSubmit} className="p-4 w-full h-full min-h-[100vh] flex flex-col gap-4 items-center justify-between">
            <div className="w-full flex flex-col gap-4 items-center justify-center">
                <h1 className="text-xl font-medium">{title}</h1>
                {children}
            </div>
            <button className="btn btn-primary w-full" disabled={isLoading || isDisabledSubmitBtn}>
                {isLoading
                    ? <span className="loading loading-infinity text-primary"></span>
                    : <span>{submitButtonText}</span>
                }
            </button>
        </form>
    );
};
