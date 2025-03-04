import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { getRealEstateProgress } from "./model/real-estate-selectors";

export const AddHousePage: FC = () => {
    const progress = useAppSelector(getRealEstateProgress);
    
    return (
        <Page back={true}>
            <div className="flex flex-col w-full h-full items-center bg-base-300 pt-4">
                <progress className="progress progress-primary w-72" value={progress} max="100"></progress>
                <Outlet />
            </div>
        </Page>
    )
}