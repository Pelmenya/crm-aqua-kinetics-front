import { FC, useMemo } from "react";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { getRealEstateId } from "@/entities/order/model/order-selectors";
import { TNullable } from "@/shared/lib/types/t-nullable";
import apartmentsBackground from './bg-apartament.jpg';
import houseBackground from './bg-house.png';
import promBackground from './bg-promo.png'; 
import { ERealEstateComponentLocation } from "@/entities/real-estate/model/real-estate-slice";
import { TCreateRealEstate } from "@/entities/real-estate/api/real-estate-api";

type RealEstateCardProps = {
    id: number;
    address: TNullable<string>;
    activeType: TNullable<TCreateRealEstate['activeType']>;
    realEstateLocation: TNullable<ERealEstateComponentLocation>;
    onClick?: () => void;
};

export const RealEstateCard: FC<RealEstateCardProps> = ({
    id,
    address,
    activeType,
    onClick,
    realEstateLocation
}) => {

    const selectedRealEstateId = useAppSelector(getRealEstateId);

    const backgroundImage = useMemo(() => {
        switch (activeType) {
            case "apartment":
                return apartmentsBackground;
            case "house":
                return houseBackground;
            case "prom":
                return promBackground;
            default:
                return houseBackground;
        }
    }, [activeType]);

    const realEstateTypeText = useMemo(() => {
        switch (activeType) {
            case "apartment":
                return 'Квартира';
            case "house":
                return 'Дом';
            case "prom":
                return 'Промышленный объект';
            default:
                return 'Объект недвижимости';
        }
    }, [activeType]);


    return (
        <div
            onClick={onClick}
            className="border border-base-300 bg-base-100 rounded-box flex column items-center justify-center cursor-pointer"
        >
            {realEstateLocation === ERealEstateComponentLocation.CHECKOUT &&
                <input
                    type="checkbox"
                    className="ml-4 checkbox checkbox-sm checkbox-primary"
                    checked={selectedRealEstateId === id}
                />
            }
            <div className="w-full h-[106px] relative">
                <div className="relative z-3 p-4">
                    <p className="font-medium tracking-tight text-[16px]">{realEstateTypeText}</p>
                    <p className="tracking-tight text-min max-w-56 opacity-70 line-clamp-3">{address}</p>
                </div>
                <div className="absolute top-0 right-0 w-[207px] h-[106px] rounded-tr-box rounded-br-box overflow-hidden">
                    <img src={backgroundImage} className="w-full h-full z-0" alt="Real Estate Background" />
                    <div
                        className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none rounded-tr-box rounded-br-box"
                        style={{
                            background: 'linear-gradient(to right, var(--color-base-100), rgba(255, 255, 255, .5))'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
