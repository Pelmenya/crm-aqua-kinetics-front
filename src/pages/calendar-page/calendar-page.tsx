import { FC, useCallback, useEffect } from 'react';
import { Page } from '@/shared/ui/components/page/page';
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { selectWorkDay, closeEditor, setWorkDays } from "@/features/calendar-service/model/calendar-service-slice";
import { WorkDayEditorModal } from '../service-profile-page/components/work-day-editor-modal/work-day-editor-modal';
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WorkScheduleCalendar } from './work-schedule-calendar/work-shedule-calendar';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Loading } from '@/shared/ui/components/loading/loading';
import {
    useDeleteCalendarWorkDayMutation,
    useFillCalendarMutation,
    useUpdateCalendarWorkDayMutation
} from '@/features/calendar-service/api/calendar-service-api';
import { useGetAccountServiceByUserQuery } from '@/entities/account-service/api/account-service-api';

export const ServiceCalendarPage: FC = () => {
    const dispatch = useAppDispatch();

    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    // данные об аккаунте
    const { data: accountServiceData, isLoading: isAccountServiceLoading } = useGetAccountServiceByUserQuery(authKey);

    // calendarMonths из данных аккаунта или используйте значение по умолчанию
    const effectiveCalendarMonths = accountServiceData?.calendarMonths ?? 2;

    const workDays = useAppSelector(state => state.calendarService.workDays);
    const selectedWorkDay = useAppSelector(state => state.calendarService.selectedWorkDay);
    const isEditorOpen = useAppSelector(state => state.calendarService.isEditorOpen);

    const [fillCalendar, { data: filledCalendarData, isLoading: isLoadingFill }] = useFillCalendarMutation();
    const [updateCalendarWorkDay, { isLoading: isUpdateLoading }] = useUpdateCalendarWorkDayMutation();
    const [deleteCalendarWorkDay, { isLoading: isDeleteLoading }] = useDeleteCalendarWorkDayMutation();

    useEffect(() => {
        if (authKey) {
            fillCalendar(authKey);
        }
    }, [authKey, fillCalendar]);

    useEffect(() => {
        if (filledCalendarData) {
            dispatch(setWorkDays(filledCalendarData));
        }
    }, [filledCalendarData, dispatch]);

    const onDaySelect = useCallback((day: TWorkDay) => {
        dispatch(selectWorkDay(day));
    }, [dispatch]);

    const onEditorSave = useCallback(async (updatedDay: TWorkDay) => {
        try {
            const result = await updateCalendarWorkDay({ authKey, updateDto: { ...updatedDay, isDeleted: false } }).unwrap();
            dispatch(setWorkDays(result));
            dispatch(closeEditor());
        } catch (error) {
            console.error('Failed to update work day:', error);
        }
    }, [dispatch, updateCalendarWorkDay, authKey]);

    const onRemove = useCallback(async () => {
        if (selectedWorkDay) {
            try {
                const result = await deleteCalendarWorkDay({ authKey, updateDto: selectedWorkDay }).unwrap();
                dispatch(setWorkDays(result));
                dispatch(closeEditor());
            } catch (error) {
                console.error('Failed to delete work day:', error);
            }
        }
    }, [dispatch, deleteCalendarWorkDay, authKey, selectedWorkDay]);

    const onCloseEditor = useCallback(() => {
        dispatch(closeEditor());
    }, [dispatch]);

    return (
        <Page back={true}>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-1">Календарь</h1>
                <p className="text-center mb-2">Здесь вы можете управлять своим расписанием</p>
                {isLoadingFill || isUpdateLoading || isDeleteLoading || isAccountServiceLoading
                    ? <Loading color="text-primary" size="loading-xs" type="loading-infinity" />
                    : <WorkScheduleCalendar
                        workDays={workDays || []}
                        calendarMonths={effectiveCalendarMonths}
                        onDaySelect={onDaySelect}
                    />}
                {selectedWorkDay && isEditorOpen && (
                    <WorkDayEditorModal
                        date={selectedWorkDay.date ? new Date(selectedWorkDay.date) : undefined}
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
