import { TNullable } from "@/shared/lib/types/t-nullable";
import { FC } from "react";

export const GroupInfo: FC<{ title: TNullable<string>, description: string, minPrice: number }> =
    ({
        title, description, minPrice
    }) => {
        return (
            <div className="flex flex-col w-[180px] gap-0.5">
                <h5 className="text-md font-bold tracking-tight ">{title}</h5>
                <p className="text-xs tracking-tight opacity-60">{description}</p>
                <h5 className="text-md font-bold tracking-tight text-primary">{`от ${minPrice.toLocaleString()}₽`}</h5>
            </div>
        )
    }