import { FC } from "react";
import { Well } from "./components/well";
import { Reservoir } from "./components/reservoir";
import { WaterSupply } from "./components/water-supply";
import { Borehole } from "./components/borehole";

export const WaterSource: FC = () => {
    return (
    <div>
        <Borehole />
        <Well />
        <Reservoir />
        <WaterSupply />

    </div>)
}