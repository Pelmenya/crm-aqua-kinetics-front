import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRealEstateByIdQuery } from '@/features/real-estate/api/real-estate-api';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Page } from '@/shared/ui/components/page/page';

export const RealEstatePage: React.FC = () => {

    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetRealEstateByIdQuery({ id: Number(id), authKey });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading real estate data</div>;

    return (
        <Page back={true}>
            <h1>Real Estate Details</h1>
            <p>Address: {data?.address}</p>
            <p>Type: {data?.activeType}</p>
        </Page>);

};