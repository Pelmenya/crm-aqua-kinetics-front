import { useGetAccountServiceByUserQuery } from "@/entities/account-service/api/account-service-api";
import { MapWithPolyline } from "@/features/map-with-polyline-editor/map-with-polyline-editor";
import { Loading } from "@/shared/ui/components/loading/loading";
import { Page } from "@/shared/ui/components/page/page";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { FC } from 'react';

export const ServiceAreaPage: FC = () => {
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    const { data: accountServiceFromBack, isFetching } = useGetAccountServiceByUserQuery(authKey, {
        refetchOnMountOrArgChange: true,
    });

console.log(accountServiceFromBack?.coordinates?.coordinates)
    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-4">
            <div className="px-4">
                {isFetching ?
                    <Loading
                        className="w-full h-full flex items-center justify-center"
                        color="text-primary"
                        size="loading-xs"
                        type="loading-infinity"
                    /> :
                    accountServiceFromBack?.coordinates 
                        ? <MapWithPolyline coordinates={{ 
                            longitude: accountServiceFromBack?.coordinates.coordinates[0], 
                            latitude: accountServiceFromBack?.coordinates.coordinates[1]}} /> 
                        : null

                }
            </div>
        </Page>
    );
};
