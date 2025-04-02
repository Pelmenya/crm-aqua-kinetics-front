import { Base } from "@/shared/ui/components/base/base";
import { FC, ReactNode } from "react";
import { Counter } from "@/shared/ui/components/counter/counter"; // Импортируем новый компонент

interface WaterIntakePointProps {
    name: string;
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    children: ReactNode;
}

export const WaterIntakePoint: FC<WaterIntakePointProps> = ({
    name,
    count,
    onIncrement,
    onDecrement,
    children,
}) => {
    return (
        <Base>
            <div className="w-full flex items-center justify-between px-4">
                <div className="flex items-center gap-4 text-sm font-semibold">
                    <div className="w-4">
                        {children}
                    </div>
                    {name}
                </div>
                <Counter
                    count={count}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    minCount={0}
                />
            </div>
        </Base>
    );
}
