import { Base } from "@/shared/ui/components/base/base";
import { ButtonWithIcon } from "@/shared/ui/components/button-with-icon/button-with-icon";
import { FC, ReactNode } from "react";

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
                <div className="flex items-center">
                    <ButtonWithIcon onClick={onDecrement} disabled={count <= 0} icon="minus" />
                    <p className="text-center w-6 text-xs">{count}</p>
                    <ButtonWithIcon onClick={onIncrement} icon="plus" />
                </div>
            </div>
        </Base>
    );
}
