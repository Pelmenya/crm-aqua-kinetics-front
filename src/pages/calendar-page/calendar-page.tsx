import { FC, useCallback, useEffect } from 'react';
import { Page } from '@/shared/ui/components/page/page';
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { selectWorkDay, saveWorkDay, removeWorkDay, closeEditor, setWorkDays } from "@/features/calendar-service/model/calendar-service-slice";
import { WorkDayEditorModal } from '../service-profile-page/components/work-day-editor-modal/work-day-editor-modal';
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WorkScheduleCalendar } from './work-schedule-calendar/work-shedule-calendar';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Loading } from '@/shared/ui/components/loading/loading';
import { useFillCalendarMutation } from '@/features/calendar-service/api/calendar-service-api';

export const ServiceCalendarPage: FC = () => {
    const dispatch = useAppDispatch();

    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    const workDays = useAppSelector(state => state.calendarService.workDays);
    const selectedWorkDay = useAppSelector(state => state.calendarService.selectedWorkDay);
    const isEditorOpen = useAppSelector(state => state.calendarService.isEditorOpen);

    const [fillCalendar, { data: filledCalendarData, isLoading }] = useFillCalendarMutation();

    useEffect(() => {
        if (authKey) {
            fillCalendar(authKey);
        }
    }, [authKey, fillCalendar]);

    useEffect(() => {
        if (filledCalendarData) {
            // Update work days with the data received from the server
            dispatch(setWorkDays(filledCalendarData));
        }
    }, [filledCalendarData, dispatch]);


    const onDaySelect = useCallback((day: TWorkDay) => {
        dispatch(selectWorkDay(day));
    }, [dispatch]);

    const onEditorSave = useCallback((updatedDay: TWorkDay) => {
        dispatch(saveWorkDay(updatedDay));
    }, [dispatch]);

    const onRemove = useCallback(() => {
        dispatch(removeWorkDay());
    }, [dispatch]);

    const onCloseEditor = useCallback(() => {
        dispatch(closeEditor());
    }, [dispatch]);

    return (
        <Page back={true}>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-1">Календарь</h1>
                <p className="text-center mb-2">Здесь вы можете управлять своим расписанием</p>
                {isLoading
                    ? <Loading color="text-primary" size="loading-xs" type="loading-infinity" />
                    : <WorkScheduleCalendar
                        workDays={workDays || []}
                        onDaySelect={onDaySelect}
                    />}
                {selectedWorkDay && isEditorOpen && (
                    <WorkDayEditorModal
                        date={new Date(String(selectedWorkDay.date)) || undefined}
                        isOpen={isEditorOpen}
                        workDay={selectedWorkDay}
                        onClose={onCloseEditor}
                        onSave={onEditorSave}
                        onRemove={onRemove}
                    />
                )}
            </div>
        </Page>
    );
};

