import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const AddHousePage: FC = () => {
    return (
        <Page back={true}>
            <div className="flex flex-col w-full h-full items-center bg-base-300 pt-4">
                <progress className="progress progress-primary w-72" value={45} max="100"></progress>
                <Outlet />
            </div>
        </Page>
    )
}