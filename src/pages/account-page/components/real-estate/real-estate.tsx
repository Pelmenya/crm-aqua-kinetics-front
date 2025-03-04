import { Base } from "@/shared/ui/components/base/base";
import { RoundPlus } from "@/pages/account-page/components/real-estate/components/round-plus/round-plus";
import { FC } from "react";
import { Link } from "@/processes/link/link";


export const RealEstate: FC = () => {
    
    return (
        <Base>
            <Link to="/add-house/step-1" className="opacity-50 pt-1 flex flex-col items-center gap-1">
                <RoundPlus />
                <p className="text-min">Добавить дом</p>
            </Link>
        </Base>
    )
};
