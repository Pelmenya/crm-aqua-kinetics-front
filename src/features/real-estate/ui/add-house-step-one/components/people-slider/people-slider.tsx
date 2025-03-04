import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";

export const PeopleSlider: FC<{ value: number, onChange: (value: number) => void }> =
    ({ value, onChange }) => {
        return (
            <Base>
                <div className="w-full max-w-xs">
                    <div className="w-full flex justify-between">
                        <p className="text-sm  font-semibold">Жильцы</p>
                        <p className="text-sm">{value} чел.</p>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={25}
                        value={value}
                        className="range range-xs range-primary"
                        step="1"
                        onChange={(e) => onChange(Number(e.target.value))}
                    />
                    <div className="w-full flex justify-between">
                        <p className="text-xs">1</p>
                        <p className="text-xs">25+</p>
                    </div>
                </div>
            </Base>
        );
    };

