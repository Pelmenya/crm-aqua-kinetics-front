import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";

export type TCardServiceProps = {
    title: string;
    state?: string;
}
export const CardService: FC<TCardServiceProps> = ({ title, state }) => {
    return (
        <Base>
            <div className="flex flex-col">
                <h5 className="font-medium tracking-tight text-[16px]">{title}</h5>
                {state ? <p className="text-min opacity-50">{state}</p> : null}
            </div>
        </Base>
    )
}