import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRealEstateByIdQuery } from '@/features/real-estate/api/real-estate-api';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Page } from '@/shared/ui/components/page/page';
import { RealEstateCard } from '@/features/real-estate/ui/real-estate/components/real-estate-card/real-estate-card';
import { Base } from '@/shared/ui/components/base/base';
import { ButtonWithIcon } from '@/shared/ui/components/button-with-icon/button-with-icon';
import ConfirmDialog from '@/shared/ui/components/confirm-dialog/confirm-dialog';

export const RealEstatePage: React.FC = () => {

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        console.log('Подтверждено!');
        setIsDialogOpen(false);
    };

    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetRealEstateByIdQuery({ id: Number(id), authKey });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading real estate data</div>;

    return (
        <Page back={true}>
            <div className="w-full h-full min-h-[100vh] p-4 gap-2 bg-base-300 flex flex-col gap-4 justify-between">
                <div className='flex flex-col gap-4 relative'>
                    <ButtonWithIcon onClick={handleOpenDialog} icon="minus" className='absolute top-2 right-2 z-10' />
                    <RealEstateCard address={data?.address} activeType={data?.activeType} />
                    <Base>
                        У Вас пока нет оборудования
                    </Base>
                </div>
                <button className='btn btn-primary'>Вызвать мастера</button>
            </div>
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
                title="Подтверждение"
                message="Вы уверены, что хотите продолжить?"
            />

        </Page>
    );

};