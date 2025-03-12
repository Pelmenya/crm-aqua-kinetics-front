import { Base } from "@/shared/ui/components/base/base";
import { FC, ReactNode } from "react";
import cn from "classnames";

export type TCardServiceProps = {
    title: string;
    status?: ReactNode;
    statusText?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
}

export const CardService: FC<TCardServiceProps> = ({ title, status, children, fullWidth = false, statusText = true }) => {
    return (
        <Base>
            <div className={cn("flex gap-2 items-center", { "w-full justify-start pl-6": fullWidth })}>
                {children}
                <div className="flex flex-col">
                    <h5 className="font-medium tracking-tight text-[16px]">{title}</h5>
                    {status && statusText && <p className="text-min opacity-50 max-w-68 line-clamp-1">{status}</p>}
                    {status && !statusText && status}
                </div>
            </div>
        </Base>
    )
}
