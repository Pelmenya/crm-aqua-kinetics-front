import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const AddHousePage: FC = () => {
    return (
        <Page back={true}>
            <Outlet />
        </Page>
    )
}