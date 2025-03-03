import { FC, useState } from "react";
import { ToggleRealEstateButtons } from "./components/toggle-real-estate-buttons/toggle-real-estate-buttons";
import { PeopleSlider } from "./components/people-slider/people-slider";
import { WaterSource } from "./components/water-source/water-source";
import { Link } from "@/processes/link/link";

export const AddHouseStepOne: FC = () => {
    const [activeType, setActiveType] = useState('house');
    const [residents, setResidents] = useState(5);
    const [activeSource, setActiveSource] = useState<string>('borehole');

    return (
        <div className="px-4 pb-4 pt-6 w-full h-full flex flex-col justify-between">
            <div className="w-full flex flex-col gap-4">
                <ToggleRealEstateButtons active={activeType} onToggle={setActiveType} />
                <PeopleSlider value={residents} onChange={setResidents} />
                <WaterSource active={activeSource} onToggle={setActiveSource} />
            </div>
            <Link to='/add-house/step-2' className="btn btn-primary">Далее</Link>
        </div>
    );
};
