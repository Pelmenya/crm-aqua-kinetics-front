import { Base } from "@/shared/ui/components/base/base";
import { RoundPlus } from "@/pages/account-page/components/real-estate/components/round-plus/round-plus";
import { FC } from "react";


export const RealEstate: FC = () => (
    <Base>
        <div className="opacity-50 pt-1 flex flex-col items-center gap-1">
            <RoundPlus />
            <p className="text-min">Добавить дом</p>
        </div>
    </Base>
);
