import { FC, useState } from "react";
import { ToggleRealEstateButtons } from "./components/toggle-real-estate-buttons/toggle-real-estate-buttons";
import { PeopleSlider } from "./components/people-slider/people-slider";

export const AddHouseStepOne: FC = () => {
    const [activeType, setActiveType] = useState("house");
    const [residents, setResidents] = useState(5);

    return (
        <div className="px-4 pt-6 w-full h-full flex flex-col gap-4">
            <ToggleRealEstateButtons active={activeType} onToggle={setActiveType} />
            <PeopleSlider value={residents} onChange={setResidents} />
        </div>
    );
};
