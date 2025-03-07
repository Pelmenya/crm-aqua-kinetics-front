import { Page } from '@/shared/ui/components/page/page';
import { FC } from 'react';

export const ServiceCalendarPage: FC = () => {
    return (
        <Page back={true}>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <p>Here you can manage your schedule.</p>
            </div>
        </Page>
    );
};