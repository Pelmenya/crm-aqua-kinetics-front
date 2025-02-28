import { FC } from "react";
import { Well } from "./components/well";
import { Reservoir } from "./components/reservoir";
import { WaterSupply } from "./components/water-supply";
import { Borehole } from "./components/borehole";
import { WaterSourceOption } from "./components/water-source-option/water-source-option";


export const WaterSource: FC<{ active: string, onToggle: (type: string) => void }> = ({ active, onToggle }) => {

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Источник воды</h3>
            <div className="grid grid-cols-4 gap-2">
                <WaterSourceOption
                    isActive={active === 'borehole'}
                    onClick={() => onToggle('borehole')}
                    label="Скважина"
                >
                    <Borehole />
                </WaterSourceOption>
                <WaterSourceOption
                    isActive={active === 'well'}
                    onClick={() => onToggle('well')}
                    label="Колодец"
                >
                    <Well />
                </WaterSourceOption>
                <WaterSourceOption
                    isActive={active === 'reservoir'}
                    onClick={() => onToggle('reservoir')}
                    label="Водоем"
                >
                    <Reservoir />
                </WaterSourceOption>
                <WaterSourceOption
                    isActive={active === 'waterSupply'}
                    onClick={() => onToggle('waterSupply')}
                    label="Водопровод"
                >
                    <WaterSupply />
                </WaterSourceOption>
            </div>
        </div>
    );
};
