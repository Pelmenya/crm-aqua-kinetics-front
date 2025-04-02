import { TCreateRealEstate } from "@/entities/real-estate/api/real-estate-api";
import { FC } from "react";
import { RealEstateCard } from "../real-estate-card/real-estate-card";
import { useNavigate } from "react-router-dom";
import { ButtonWithIcon } from "@/shared/ui/components/button-with-icon/button-with-icon";
import { TRealEstateComponentLocation } from "@/entities/real-estate/model/real-estate-slice";
import { TNullable } from "@/shared/lib/types/t-nullable";

export type TRealEatateListProps = {
    title: string;
    realEstatesList: TCreateRealEstate[];
    realEstateLocation: TNullable<TRealEstateComponentLocation>;
    onClickCard: (id: number) => void;
}

export const RealEstateList: FC<TRealEatateListProps> = ({
    realEstatesList,
    onClickCard,
    title,
    realEstateLocation, // добавляем в props
}) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col gap-2 bg-base-300">
            <div className="flex w-full items-center justify-between">
                <h4>{title}</h4>
                <ButtonWithIcon onClick={() => navigate('/add-house/step-1')} icon="plus" />
            </div>
            {
                realEstatesList.map(
                    realEstate =>
                        <RealEstateCard
                            key={realEstate.id}
                            id={realEstate.id || -1}
                            onClick={() => onClickCard(Number(realEstate.id))}
                            address={realEstate.address}
                            activeType={realEstate.activeType}
                            realEstateLocation={realEstateLocation} // передаём realEstateLocation
                        />
                )
            }
        </div>
    );
}