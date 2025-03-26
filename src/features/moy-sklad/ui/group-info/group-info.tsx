import { TNullable } from "@/shared/lib/types/t-nullable";
import { FC } from "react";
import cn from "classnames";

export const GroupInfo: FC<{ title: TNullable<string>, description: string, minPrice: number, cardType?: 'top' | 'sub' }> =
    ({
        title,
        description,
        cardType = 'top',
    }) => {
        return (
            <div className={cn('flex flex-col w-[180px] gap-0.5', { ['w-[220px]']: cardType === 'sub' })}>
                <h5 className={cn('text-md font-bold tracking-tight line-clamp-1',{ ['opacity-70 text-sm font-semibold']: cardType === 'sub' })}>{title}</h5>
                <p className="text-xs tracking-tight opacity-60 line-clamp-2">{description}</p>
{/*                 <p className="text-sm font-bold tracking-tight text-primary">{`от ${minPrice.toLocaleString()}₽`}</p>
 */}            </div>
        )
    }