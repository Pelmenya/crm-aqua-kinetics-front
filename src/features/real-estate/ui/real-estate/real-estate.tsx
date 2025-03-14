import { Base } from "@/shared/ui/components/base/base";
import { RoundPlus } from "@/features/real-estate/ui/real-estate/components/round-plus/round-plus";
import { FC, useEffect} from "react";
import { Link } from "@/app/link/link";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useGetRealEstatesQuery } from "../../api/real-estate-api";
import { RealEstateList } from "./components/real-estate-list/real-estate-list";
import { Loading } from "@/shared/ui/components/loading/loading";

export const RealEstate: FC = () => {
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw;
    // Use the query hook to fetch data
    const { data, error, isLoading, refetch } = useGetRealEstatesQuery(authKey || '', {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (authKey) {
            refetch();
        }
    }, [authKey, refetch])

    return (
        <>
            {data && data.length === 0 ?
                <Base>
                    <Link to="/add-house/step-1" className="opacity-50 pt-1 flex flex-col items-center gap-1">
                        <RoundPlus />
                        <p className="text-min">Добавить дом</p>
                    </Link>
                </Base>
                : <>
                    {isLoading && <Loading color="text-primary" size="loading-xs" type="loading-infinity" />}
                    {error && <p>Error fetching data</p>}
                    {data && <RealEstateList realEstatesList={data} />}
                </>
            }
        </>
    )
};
