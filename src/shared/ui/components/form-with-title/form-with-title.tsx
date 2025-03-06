import { FC, ReactNode } from "react";

export type TFormWithTitleProps = {
    title: string;
    onSubmit: () => void;
    submitButtonText: string;
    children: ReactNode;
};

export const FormWithTitle: FC<TFormWithTitleProps> = ({ title, onSubmit, submitButtonText, children }) => {
    return (
        <form onSubmit={onSubmit} className="p-4 w-full h-full min-h-[100vh] flex flex-col gap-6 items-center justify-between">
            <div className="w-full flex flex-col gap-6 items-center justify-center">
            <h1 className="text-xl font-medium">{title}</h1>
            {children}
            </div>
            <button className="btn btn-primary w-full">
                {submitButtonText}
            </button>
        </form>
    );
};
