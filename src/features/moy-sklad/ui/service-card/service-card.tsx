import { FC, useState, useEffect } from "react";
import { useGetServiceQuery } from "../../api/moy-sklad-api";
import { Base } from "@/shared/ui/components/base/base";
import { Counter } from "@/shared/ui/components/counter/counter";

export const ServiceCard: FC<{ id: string }> = ({ id }) => {
    const { data: service } = useGetServiceQuery(id || '');

    const [count, setCount] = useState<number>(1);
    const [checked, setChecked] = useState<boolean>(false);

    const handleOnIncrement = () => setCount(count + 1);

    const handleOnDecrement = () => {
        setCount((state) => Math.max(state - 1, 0));
    };

    const handleCheckboxChange = () => {
        if (!checked) {
            setCount(1);
        } else {
            setCount(0);
        }
        setChecked(!checked);
    };

    // Используем useEffect, чтобы сбрасывать checked на false, если count становится 0
    useEffect(() => {
        if (count === 0) {
            setChecked(false);
        }
    }, [count]);

    return (
        <Base className='px-4 flex items-center justify-between'>
            <div className='flex items-center gap-2 flex-grow'>
                <label htmlFor={id} className='text-sm flex items-center gap-2 min-h-14'>
                    <input 
                        id={id} 
                        type="checkbox" 
                        checked={checked} 
                        onChange={handleCheckboxChange} 
                        className="checkbox checkbox-sm" 
                    />
                    {service?.name}
                </label>
            </div>
            {/* Условно рендерим Counter только если checked: true */}
            {checked && (
                <div className='flex-shrink-0'>
                    <Counter onDecrement={handleOnDecrement} onIncrement={handleOnIncrement} count={count} minCount={0}/>
                </div>
            )}
        </Base>
    );
}
