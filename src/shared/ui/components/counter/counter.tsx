import { FC } from "react";
import { ButtonWithIcon } from "@/shared/ui/components/button-with-icon/button-with-icon";

interface CounterProps {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    minCount?: number; // Минимальное значение счетчика
    maxCount?: number; // Максимальной значение счетчика
}

export const Counter: FC<CounterProps> = ({ count, onIncrement, onDecrement, minCount = -Infinity, maxCount = Infinity }) => (
    <div className="flex items-center">
        <ButtonWithIcon onClick={onDecrement} disabled={count <= minCount || count >= maxCount} icon="minus" />
        <p className="text-center w-6 text-xs">{count}</p>
        <ButtonWithIcon onClick={onIncrement} icon="plus" />
    </div>
);