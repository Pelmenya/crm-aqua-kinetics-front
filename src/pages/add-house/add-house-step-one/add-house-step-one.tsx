import { FC, useState } from "react";
import { ToggleRealEstateButtons } from "./components/toggle-real-estate-buttons/toggle-real-estate-buttons";
import { PeopleSlider } from "./components/people-slider/people-slider";
import { WaterSource } from "./components/water-source/water-source";

export const AddHouseStepOne: FC = () => {
    const [activeType, setActiveType] = useState("house");
    const [residents, setResidents] = useState(5);
    const [activeSource, setActiveSource] = useState<string>('borehole');


    return (
        <div className="px-4 pt-6 w-full h-full flex flex-col gap-4">
            <ToggleRealEstateButtons active={activeType} onToggle={setActiveType} />
            <PeopleSlider value={residents} onChange={setResidents} />
            <WaterSource active={activeSource} onToggle={setActiveSource} />
            <div className="w-full flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Адрес</h3>
                <input type="text" className="input input-primary w-full" />
            </div>
        </div>
    );
};
