import { FC, ReactNode } from "react";

export type TBaseProps = {
    children?: ReactNode;
}

export const Base: FC<TBaseProps> = ({ children }) => (
    <div className="border border-base-300 bg-base-100 rounded-box py-4 flex column items-center justify-center">
        {children}
    </div>
);
