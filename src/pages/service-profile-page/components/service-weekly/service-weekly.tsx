import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { FC, useState } from "react";
import { WeeklyDatePicker } from "../weekly-date-picker/weekly-date-picker";
import { WorkDayEditor } from "../work-day-editor/work-day-editor";

export const ServiceWeekly: FC = () => {
    const [workDays, setWorkDays] = useState<TWorkDay[]>([]);
    const [selectedWorkDay, setSelectedWorkDay] = useState<TWorkDay | null>(null);

    const handleSave = (days: TWorkDay[]) => {
        setWorkDays(days);
        setSelectedWorkDay(null);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold">Weekly Calendar</h1>
            <p>Manage your weekly schedule.</p>
            <WeeklyDatePicker workDays={workDays} onDaySelect={setSelectedWorkDay} onSave={handleSave} />
            {selectedWorkDay && (
                <WorkDayEditor
                    workDay={selectedWorkDay}
                    onSave={(updatedDay) => {
                        setWorkDays(prevDays =>
                            prevDays.map(day => day.date.toDateString() === updatedDay.date.toDateString() ? updatedDay : day)
                        );
                        setSelectedWorkDay(null);
                    }}
                    onRemove={(date) => {
                        setWorkDays(prevDays => prevDays.filter(day => day.date.toDateString() !== date.toDateString()));
                        setSelectedWorkDay(null);
                    }}
                />
            )}
        </div>
    );
};
