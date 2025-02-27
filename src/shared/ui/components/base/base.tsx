import { FC, ReactNode } from "react";

export type TBaseProps = Partial<{
    children: ReactNode;
}>

export const Base: FC = ({ children }: TBaseProps) => (
    <div className="border border-base-300 bg-base-100 rounded-box p-4 flex column items-center justify-center">
        {children}
    </div>
);