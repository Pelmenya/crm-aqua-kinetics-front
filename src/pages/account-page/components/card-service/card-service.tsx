import { Base } from "@/shared/ui/components/base/base";
import { FC, ReactNode } from "react";

export type TCardServiceProps = {
    title: string;
    status?: ReactNode;
    children?: ReactNode;
}
export const CardService: FC<TCardServiceProps> = ({ title, status, children }) => {
    return (
        <Base>
            <div className="flex gap-2 items-center">
                {children}
                <div className="flex flex-col">
                    <h5 className="font-medium tracking-tight text-[16px]">{title}</h5>
                    {status ? <p className="text-min opacity-50">{status}</p> : null}
                </div>
            </div>
        </Base>
    )
}