import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";

export type TCardServiceProps = {
    title: string;
    status?: string;
}
export const CardService: FC<TCardServiceProps> = ({ title, status }) => {
    return (
        <Base>
            <div className="flex flex-col">
                <h5 className="font-medium tracking-tight text-[16px]">{title}</h5>
                {status ? <p className="text-min opacity-50">{status}</p> : null}
            </div>
        </Base>
    )
}