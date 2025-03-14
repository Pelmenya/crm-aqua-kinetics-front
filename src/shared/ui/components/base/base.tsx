import { FC, ReactNode } from "react";
import cn from "classnames";

export type TBaseProps = {
    children?: ReactNode;
    className?: string;
}

export const Base: FC<TBaseProps> = ({ children, className }) => (
    <div className={cn("border border-base-300 bg-base-100 rounded-box py-4 flex column items-center justify-center", className && className)}>
        {children}
    </div>
);
