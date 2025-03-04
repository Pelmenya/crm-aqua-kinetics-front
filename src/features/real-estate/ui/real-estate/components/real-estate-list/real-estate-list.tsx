import { TCreateRealEstate } from "@/features/real-estate/api/real-estate-api";
import { FC } from "react";
import { RealEstateCard } from "../real-estate-card/real-estate-card";
import { Link } from "@/processes/link/link";

export const RealEstateList: FC<{ realEstatesList: TCreateRealEstate[] }> = ({ realEstatesList }) => {

    return (
        <div className="w-full flex flex-col gap-2 bg-base-300">
            <div className="flex w-full items-center justify-between">
                <h4>Дома и квартиры</h4>
                <Link to='/add-house/step-1' className="btn btn-xs btn-square btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>
            {
                realEstatesList.map(
                    realEstate =>
                        <RealEstateCard key={realEstate.id} id={realEstate.id} address={realEstate.address} activeType={realEstate.activeType} />
                )
            }
        </div>
    )
}