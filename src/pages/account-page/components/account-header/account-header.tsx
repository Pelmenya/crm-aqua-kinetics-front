import { Notification } from "@/shared/ui/icons/notification";
import { Settings } from "@/shared/ui/icons/settings";
import { FC } from "react";

export type TAccountProps = {
    title: string;
}
export const AccountHeader: FC<TAccountProps> = ({ title }) => {

    return (
        <header className="py-2 flex justify-between">
            <Settings />
            <h1 className="font-medium">{title}</h1>
            <Notification />
        </header>
    )
}