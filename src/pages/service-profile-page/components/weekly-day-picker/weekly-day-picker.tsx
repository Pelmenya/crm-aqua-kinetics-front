import { FC } from 'react';
import { TWorkDay } from '@/shared/lib/types/t-work-day';

type TWeeklyDayPickerProps = {
  workDays: TWorkDay[];
  onDaySelect: (day: TWorkDay) => void;
}
const daysOfWeek = [1, 2, 3, 4, 5, 6, 0];

const getDayByIdx = (idx: number): string => {
    const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return dayNames[idx] || "";
};

export const WeeklyDayPicker: FC<TWeeklyDayPickerProps> = ({ workDays, onDaySelect }) => {
  const toggleDaySelection = (dayIndex: number) => {

    const existingDay = workDays.find(day => day.dayOfWeek === dayIndex);

    if (existingDay) {
      onDaySelect(existingDay);
    } else {
      const newWorkDay: TWorkDay = {
        date: null,
        dayOfWeek: dayIndex,
        startHour: 8,
        startMinute: 0, 
        endHour: 17,
        endMinute: 0,
      };
      onDaySelect(newWorkDay);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg text-center font-bold mb-4">Выберите рабочие дни (Неделя)</h2>
      <div className="flex space-x-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`p-2 btn btn-md btn-outline ${workDays.some(d => d.dayOfWeek === day) ? 'btn-warning' : ''}`}
            onClick={() => toggleDaySelection(day)}
          >
            {getDayByIdx(day)}
          </button>
        ))}
      </div>
    </div>
  );
};
