import { TCreateRealEstate } from "@/features/real-estate/api/real-estate-api";
import { FC } from "react";
import { RealEstateCard } from "../real-estate-card/real-estate-card";
import { useNavigate } from "react-router-dom";
import { ButtonWithIcon } from "@/shared/ui/components/button-with-icon/button-with-icon";

export type TRealEatateListProps = {
    title?: string;
    realEstatesList: TCreateRealEstate[];
    onClickCard: (id: number) => void;
}

export const RealEstateList: FC<TRealEatateListProps> = ({
    realEstatesList,
    onClickCard,
    title,
}) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col gap-2 bg-base-300">
            <div className="flex w-full items-center justify-between">
                <h4>{title || 'Дома, квартиры и промобъекты'}</h4>
                <ButtonWithIcon onClick={() => navigate('/add-house/step-1')} icon="plus" />
            </div>
            {
                realEstatesList.map(
                    realEstate =>
                        <RealEstateCard
                            key={realEstate.id}
                            /*                             
                            onClick={() => navigate(`/real-estate-page/${realEstate.id}`)}
                             */
                            onClick={() => onClickCard(Number(realEstate.id))}
                            address={realEstate.address}
                            activeType={realEstate.activeType}
                        />
                )
            }
        </div>
    )
}