import { FC } from "react";
import { ToggleRealEstateButtons } from "./components/toggle-real-estate-buttons/toggle-real-estate-buttons";
import { PeopleSlider } from "./components/people-slider/people-slider";
import { WaterSource } from "./components/water-source/water-source";
import { Link } from "@/processes/link/link";
import { setActiveSource, setActiveType, setResidents } from "../model/real-estate-slice";
import { getActiveSource, getActiveType, getResidents } from "../model/real-estate-selectors";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";

export const AddHouseStepOne: FC = () => {
    const dispatch = useAppDispatch();

    const activeType = useAppSelector(getActiveType);
    const residents = useAppSelector(getResidents);
    const activeSource = useAppSelector(getActiveSource);

    return (
        <div className="px-4 pb-4 pt-6 w-full h-full flex flex-col justify-between">
            <div className="w-full flex flex-col gap-4">
                <ToggleRealEstateButtons active={activeType} onToggle={(type) => dispatch(setActiveType(type))} />
                <PeopleSlider value={residents} onChange={(count) => dispatch(setResidents(count))} />
                <WaterSource active={activeSource} onToggle={(source) => dispatch(setActiveSource(source))} />
            </div>
            <Link to='/add-house/step-2' className="btn btn-primary">Далее</Link>
        </div>
    );
};
