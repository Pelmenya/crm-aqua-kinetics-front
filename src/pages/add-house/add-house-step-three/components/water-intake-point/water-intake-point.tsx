import { Base } from "@/shared/ui/components/base/base";
import { FC, ReactNode } from "react";

interface WaterIntakePointProps {
    name: string;
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    children: ReactNode;
}

export const WaterIntakePoint: FC<WaterIntakePointProps> = ({ name, count, onIncrement, onDecrement, children }) => {
    return (
        <Base>
            <div className="w-full flex items-center justify-between px-4">
                <div className="flex items-center gap-4 text-sm font-semibold">
                    <div className="w-4">
                        {children}
                    </div>
                    {name}
                </div>
                <div className="flex items-center">
                    <button className="btn btn-xs btn-square btn-outline" onClick={onDecrement} disabled={count <= 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </button>
                    <p className="text-center w-6 text-xs">{count}</p> {/* Добавлен класс 'w-8' для фиксированной ширины */}
                    <button className="btn btn-xs btn-square btn-outline" onClick={onIncrement}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </Base>
    );
}
