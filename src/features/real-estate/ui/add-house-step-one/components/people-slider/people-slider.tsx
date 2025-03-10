import { RangeSlider } from "@/shared/ui/components/range-slider.tsx/range-slider";
import { FC } from "react";

export const PeopleSlider: FC<{ value: number, onChange: (value: number) => void }> =
    ({ value, onChange }) => (
        <RangeSlider
            value={value}
            onChange={onChange}
            min={1}
            max={25}
            label="Жильцы"
            unit="чел."
        />
    ); 
