import { FC, useState } from "react";
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WeeklyDatePicker } from "../weekly-date-picker/weekly-date-picker";
import { WorkDayEditorModal } from "../work-day-editor-modal/work-day-editor-modal";

export const ServiceWeekly: FC = () => {
  const [workDays, setWorkDays] = useState<TWorkDay[]>([]);
  const [selectedWorkDay, setSelectedWorkDay] = useState<TWorkDay | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleDaySelect = (day: TWorkDay) => {
    setSelectedWorkDay(day);
    setIsEditorOpen(true);
  };

  const handleEditorSave = (updatedDay: TWorkDay) => {
    const dayExists = workDays.some(day => day.date.getDay() === updatedDay.date.getDay());

    if (dayExists) {
      setWorkDays(prevDays =>
        prevDays.map(day =>
          day.date.getDay() === updatedDay.date.getDay() ? updatedDay : day
        )
      );
    } else {
      setWorkDays(prevDays => [...prevDays, updatedDay]);
    }

    setIsEditorOpen(false);
  };

  const handleRemove = () => {
    if (selectedWorkDay) {
      setWorkDays(prevDays =>
        prevDays.filter(day => day.date.getDay() !== selectedWorkDay.date.getDay())
      );
      setSelectedWorkDay(null);
      setIsEditorOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Weekly Calendar</h1>
      <p>Manage your weekly schedule.</p>
      <WeeklyDatePicker workDays={workDays} onDaySelect={handleDaySelect} />
      {selectedWorkDay && (
        <WorkDayEditorModal
          isOpen={isEditorOpen}
          workDay={selectedWorkDay}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleEditorSave}
          onRemove={handleRemove} // Теперь действительно удаляет день
        />
      )}
    </div>
  );
};
