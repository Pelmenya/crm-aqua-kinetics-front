import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";

type RangeSliderProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label: string;
    unit: string;
};

export const RangeSlider: FC<RangeSliderProps> = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    label,
    unit,
}) => {
    return (
        <Base>
            <div className="w-full max-w-xs">
                <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-sm">{value} {unit}</p>
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    className="range range-xs range-primary"
                    step={step}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <div className="w-full flex justify-between">
                    <p className="text-xs">{min}</p>
                    <p className="text-xs">{max}+</p>
                </div>
            </div>
        </Base>
    );
};
