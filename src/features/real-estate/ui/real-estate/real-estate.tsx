import { Base } from "@/shared/ui/components/base/base";
import { RoundPlus } from "@/features/real-estate/ui/real-estate/components/round-plus/round-plus";
import { FC, useEffect } from "react";
import { Link } from "@/app/link/link";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useGetRealEstatesQuery } from "../../api/real-estate-api";
import { RealEstateList } from "./components/real-estate-list/real-estate-list";
import { Loading } from "@/shared/ui/components/loading/loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { setLocation, TRealEstateComponentLocation } from "../../model/real-estate-slice";
import { getRealEstateLocation } from "../../lib/get-real-estate-location";

export const RealEstate: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw;
    // Use the query hook to fetch data
    const { data, error, isLoading, refetch } = useGetRealEstatesQuery(authKey || '', {
        refetchOnMountOrArgChange: true,
    });

    const realEstateLocation = getRealEstateLocation(location);

    useEffect(() => {
        if (authKey) {
            refetch();
            dispatch(setLocation(realEstateLocation));
        }
    }, [authKey, refetch, dispatch, location])

    const handleOnClickCard = (id: number) => {
        if (realEstateLocation === TRealEstateComponentLocation.ACCOUNT) {
            navigate(`/real-estate-page/${id}`)
        }
        if (realEstateLocation === TRealEstateComponentLocation.CHECKOUT) {
            console.log(id);
        }
    }

    return (
        <>
            {data && data.length === 0 ?
                <Base>
                    <Link to="/add-house/step-1" className="opacity-50 pt-1 flex flex-col items-center gap-1">
                        <RoundPlus />
                        <p className="text-min">Добавить недвижимость</p>
                    </Link>
                </Base>
                : <>
                    {isLoading && <Loading color="text-primary" size="loading-xs" type="loading-infinity" />}
                    {error && <p>Error fetching data</p>}
                    {data && <RealEstateList realEstatesList={data} onClickCard={handleOnClickCard}/>}
                </>
            }
        </>
    )
};
