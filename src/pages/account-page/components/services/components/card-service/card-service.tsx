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
                <h5 className="font-semibold opacity-80 text-[15px]">{title}</h5>
                {state ? <p className="text-min opacity-50">{state}</p> : null}
            </div>
        </Base>
    )
}