import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WeeklyDayPicker } from "../weekly-day-picker/weekly-day-picker";
import { WorkDayEditorModal } from "../work-day-editor-modal/work-day-editor-modal";
import { Base } from "@/shared/ui/components/base/base";
import { getAccountServiceState } from "@/entities/account-service/model/account-service-selectors";
import { closeEditor, removeWorkDay, saveWorkDay, selectWorkDay } from "@/entities/account-service/model/account-service-slice";

export const ServiceWeekly: FC = () => {
    const dispatch = useDispatch();
    const { workDays, selectedWorkDay, isEditorOpen } = useSelector(getAccountServiceState);

    const handleDaySelect = useCallback((day: TWorkDay) => {
        dispatch(selectWorkDay(day));
    }, [dispatch]);

    const handleEditorSave = useCallback((updatedDay: TWorkDay) => {
        dispatch(saveWorkDay(updatedDay));
    }, [dispatch]);

    const handleRemove = useCallback(() => {
        dispatch(removeWorkDay());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-xl font-bold">Еженедельное расписание</h1>
            <p>Управляйте своим расписанием.</p>
            <p className="text-center mb-4">Изменить конкретную дату можно на вкладке календаря</p>
            <Base>
                <WeeklyDayPicker workDays={workDays} onDaySelect={handleDaySelect} />
            </Base>
            {selectedWorkDay && (
                <WorkDayEditorModal
                    isOpen={isEditorOpen}
                    workDay={selectedWorkDay}
                    onClose={() => dispatch(closeEditor())}
                    onSave={handleEditorSave}
                    onRemove={handleRemove}
                />
            )}
        </div>
    );
};
