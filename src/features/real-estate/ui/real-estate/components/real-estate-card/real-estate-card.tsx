import { TCreateRealEstate } from "@/features/real-estate/api/real-estate-api";
import { FC, useMemo } from "react";
import apartmentsBackground from './bg-apartament.jpg';
import houseBackground from './bg-house.png';
import { useNavigate } from "react-router-dom";

export const RealEstateCard: FC<Partial<TCreateRealEstate>> = ({ id, address, activeType }) => {

    const navigate = useNavigate();
    // Выбираем фон в зависимости от activeType
    const backgroundStyle = activeType === "apartment" ? apartmentsBackground : houseBackground;
    const typeRealEstate = useMemo(() => activeType === 'apartment' ? 'Квартира по адресу:' : 'Дом по адресу:', [activeType])


    return (
        <div onClick={
            () => navigate(`/real-estate-page/${id}`)}
            className="border border-base-300 bg-base-100 rounded-box flex column items-center justify-center cursor-pointer"
        >
            <div className="w-full h-[106px] relative">
                <div className="relative z-3 p-4">
                    <p className="font-medium tracking-tight text-[16px]">{typeRealEstate}</p>
                    <p className="tracking-tight text-min max-w-56 opacity-70 line-clamp-3">{address}</p>
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
