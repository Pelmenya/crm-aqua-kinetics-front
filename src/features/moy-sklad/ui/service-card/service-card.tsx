import { FC } from "react";
import { useGetServiceQuery } from "../../api/moy-sklad-api";
import { Counter } from "@/shared/ui/components/counter/counter";
export type TServiceCardProps = {
    id: string;
    count: number;
    checked: boolean;
    onIncrement: () => void;
    onDecrement: () => void;
    onCheckboxChange: () => void;
}

export const ServiceCard: FC<TServiceCardProps> = ({
    id,
    count,
    checked,
    onIncrement,
    onDecrement,
    onCheckboxChange
}) => {
    const { data: service } = useGetServiceQuery(id || '');

    return (
        <div className='flex py-2 items-center justify-between gap-2'>
            <div className='flex items-center gap-2 flex-grow'>
                <label htmlFor={id} className='text-sm flex items-center gap-2 min-h-12'>
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={onCheckboxChange}
                        className="checkbox checkbox-sm"
                    />
                    {service?.name}
                </label>
            </div>
            {checked && (
                <div className='flex-shrink-0'>
                    <Counter onDecrement={onDecrement} onIncrement={onIncrement} count={count} minCount={0} />
                </div>
            )}
        </div>
    );
};
