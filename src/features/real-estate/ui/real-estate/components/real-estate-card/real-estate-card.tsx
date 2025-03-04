import { TCreateRealEstate } from "@/features/real-estate/api/real-estate-api";
import { FC } from "react";
import apartmentsBackground from './bg-apartament.jpg';
import houseBackground from './bg-house.png';

export const RealEstateCard: FC<Partial<TCreateRealEstate>> = ({ address, activeType }) => {

    // Выбираем фон в зависимости от activeType
    const backgroundStyle = activeType === "apartment" ? apartmentsBackground : houseBackground;

    return (
        <div className="border border-base-300 bg-base-100 rounded-box flex column items-center justify-center">
            <div className="w-full h-[106px] relative">
                <div className="relative z-3 p-4">
                    <p>{activeType}</p>
                    <p>{address}</p>
                </div>
                <div className="absolute top-0 right-0 w-[207px] h-[106px] rounded-tr-box rounded-br-box overflow-hidden">
                    <img src={backgroundStyle} className="w-full h-full z-0" />
                    <div
                        className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none rounded-tr-box rounded-br-box"
                        style={{
                            background: 'linear-gradient(to right, var(--color-base-100), rgba(255, 255, 255, .5))'
                        }} />
                </div>
            </div>
        </div>
    );
};
