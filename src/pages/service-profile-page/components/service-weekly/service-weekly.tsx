import { FC, useState, useCallback } from "react";
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WeeklyDatePicker } from "../weekly-date-picker/weekly-date-picker";
import { WorkDayEditorModal } from "../work-day-editor-modal/work-day-editor-modal";
import { Base } from "@/shared/ui/components/base/base";

export const ServiceWeekly: FC = () => {
    const [workDays, setWorkDays] = useState<TWorkDay[]>([]);
    const [selectedWorkDay, setSelectedWorkDay] = useState<TWorkDay | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const handleDaySelect = useCallback((day: TWorkDay) => {
        setSelectedWorkDay(day);
        setIsEditorOpen(true);
    }, []);

    const handleEditorSave = useCallback((updatedDay: TWorkDay) => {
        setWorkDays(prevDays => {
            const dayExists = prevDays.some(day => day.date.getTime() === updatedDay.date.getTime());

            if (dayExists) {
                return prevDays.map(day =>
                    day.date.getTime() === updatedDay.date.getTime() ? updatedDay : day
                );
            } else {
                return [...prevDays, updatedDay];
            }
        });

        setIsEditorOpen(false);
    }, []);

    const handleRemove = useCallback(() => {
        if (selectedWorkDay) {
            setWorkDays(prevDays =>
                prevDays.filter(day => day.date.getTime() !== selectedWorkDay.date.getTime())
            );
            setSelectedWorkDay(null);
            setIsEditorOpen(false);
        }
    }, [selectedWorkDay]);

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-xl font-bold">Еженедельное расписание</h1>
            <p>Управляйте своим расписанием.</p>
            <p className="text-center mb-4">Изменить конкретную дату можно на вкладке календаря</p>
            <Base>
                <WeeklyDatePicker workDays={workDays} onDaySelect={handleDaySelect} />
            </Base>
            {selectedWorkDay && (
                <WorkDayEditorModal
                    isOpen={isEditorOpen}
                    workDay={selectedWorkDay}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={handleEditorSave}
                    onRemove={handleRemove}
                />
            )}
        </div>
    );
};
