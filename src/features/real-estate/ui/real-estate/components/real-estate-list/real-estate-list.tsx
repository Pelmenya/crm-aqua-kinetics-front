import { TCreateRealEstate } from "@/features/real-estate/api/real-estate-api";
import { FC } from "react";
import { RealEstateCard } from "../real-estate-card/real-estate-card";

export const RealEstateList: FC<{ realEstatesList: TCreateRealEstate[] }> = ({ realEstatesList }) => {

    return (
        <div className="w-full flex flex-col gap-2 bg-base-300">
            <h4>Дома и квартиры</h4>
            {
                realEstatesList.map(
                    realEstate =>
                        <RealEstateCard key={realEstate.id} address={realEstate.address} activeType={realEstate.activeType} />
                )
            }
        </div>
    )
}