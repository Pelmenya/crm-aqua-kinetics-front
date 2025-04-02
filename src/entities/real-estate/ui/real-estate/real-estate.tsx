import { Base } from "@/shared/ui/components/base/base";
import { RoundPlus } from "@/entities/real-estate/ui/real-estate/components/round-plus/round-plus";
import { FC, useEffect, useMemo } from "react";
import { Link } from "@/app/link/link";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useGetRealEstatesQuery } from "../../api/real-estate-api";
import { RealEstateList } from "./components/real-estate-list/real-estate-list";
import { Loading } from "@/shared/ui/components/loading/loading";
import { useLocation, useNavigate } from "react-router-dom";
import { setLocation, ERealEstateComponentLocation } from "../../model/real-estate-slice";
import { getRealEstateLocation } from "../../lib/get-real-estate-location";
import { getRealEstateId } from "@/entities/order/model/order-selectors";
import { setSelectedRealEstateId } from "@/entities/order/model/order-slice";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";

export const RealEstate: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedRealEstateId = useAppSelector(getRealEstateId);
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw;
    const { data, error, isLoading, refetch } = useGetRealEstatesQuery(authKey || '', {
        refetchOnMountOrArgChange: true,
    });

    const realEstateLocation = getRealEstateLocation(location);
    const realEstateListTitle = useMemo(() =>
        realEstateLocation === ERealEstateComponentLocation.ACCOUNT
            ? 'Дома, квартиры и промобъекты'
            : realEstateLocation === ERealEstateComponentLocation.CHECKOUT ? 'Выберите недвижимость' : '', [realEstateLocation]);

    useEffect(() => {
        if (authKey) {
            refetch();
            dispatch(setLocation(realEstateLocation));
        }
    }, [authKey, refetch, dispatch, location]);

    const handleOnClickCard = (id: number) => {
        if (realEstateLocation === ERealEstateComponentLocation.ACCOUNT) {
            navigate(`/real-estate-page/${id}`);
        }
        if (realEstateLocation === ERealEstateComponentLocation.CHECKOUT) {
            if (selectedRealEstateId === id) {
                dispatch(setSelectedRealEstateId(null)); // Снять выбор
            } else {
                dispatch(setSelectedRealEstateId(id)); // Установить выбор
            }

        }
    };

    const filteredData = useMemo(() => {
        if (realEstateLocation === ERealEstateComponentLocation.CHECKOUT && selectedRealEstateId !== null) {
            return data?.filter((realEstate) => realEstate.id === selectedRealEstateId);
        }
        return data;
    }, [data, selectedRealEstateId, realEstateLocation]);

    return (
        <>
            {filteredData && filteredData.length === 0 ?
                <Base>
                    <Link to="/add-house/step-1" className="opacity-50 pt-1 flex flex-col items-center gap-1">
                        <RoundPlus />
                        <p className="text-min">Добавить недвижимость</p>
                    </Link>
                </Base>
                : <>
                    {isLoading && <Loading color="text-primary" size="loading-xs" type="loading-infinity" />}
                    {error && <p>Error fetching data</p>}
                    {filteredData &&
                        <RealEstateList
                            realEstatesList={filteredData}
                            onClickCard={handleOnClickCard}
                            title={realEstateListTitle}
                            realEstateLocation={realEstateLocation}
                        />
                    }
                </>
            }
        </>
    );
};
