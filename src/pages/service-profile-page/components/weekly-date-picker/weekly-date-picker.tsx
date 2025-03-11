import { FC } from 'react';
import { TWorkDay } from '@/shared/lib/types/t-work-day';

interface WeeklyDatePickerProps {
  workDays: TWorkDay[];
  onDaySelect: (day: TWorkDay) => void;
}

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const WeeklyDatePicker: FC<WeeklyDatePickerProps> = ({ workDays, onDaySelect }) => {
  const toggleDaySelection = (dayIndex: number) => {
    const dateIndex = (dayIndex + 1) % 7;

    const existingDay = workDays.find(day => day.date.getDay() === dateIndex);

    if (existingDay) {
      onDaySelect(existingDay);
    } else {
      const newWorkDay: TWorkDay = {
        date: new Date(2025, 0, 5 + dateIndex),
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
        {daysOfWeek.map((day, index) => (
          <button
            key={index}
            className={`p-2 btn btn-md btn-outline ${workDays.some(d => d.date.getDay() === (index + 1) % 7) ? 'btn-warning' : ''}`}
            onClick={() => toggleDaySelection(index)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
