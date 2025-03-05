import { RealEstate } from "@/features/real-estate/ui/real-estate/real-estate";
import { FC } from "react";
import { Services } from "../services/services";

export const AccountClient: FC = () => {
    return (
        <>
            <RealEstate />
            <Services />
        </>
    )
}