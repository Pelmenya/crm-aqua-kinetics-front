import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";
import { TGroup } from "../../api/moy-sklad-api";
import imgSoftener from './imgSoftener.png';
import imgDwm from './imgDwm.png';
import imgLinefilters from './imgLinefilters.png';

export const TopLevelGroupCard: FC<{ group: TGroup }> =
    ({ group }) => {
        return (
            <Base className="px-4 pt-0 pb-0 w-full relative">
                <div className="min-h-[115px] max-h-[115px] flex items-center w-full">
                    <div className="flex flex-col w-[180px] gap-0.5">
                        <h5 className="text-md font-bold tracking-tight ">{group.groupName}</h5>
                        <p className="text-xs tracking-tight opacity-60">{group?.bundle?.description}</p>
                        <h5 className="text-md font-bold tracking-tight text-primary">{"от 49 900Р"}</h5>
                    </div>
                    <img className="max-h-[100px] absolute bottom-0 right-4" src={group.groupName === 'Waterboss' ? imgSoftener: imgLinefilters} alt={group.groupName || ''}/>
                </div>
            </Base>)

    } 