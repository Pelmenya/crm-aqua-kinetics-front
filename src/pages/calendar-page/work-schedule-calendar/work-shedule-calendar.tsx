import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { FC } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

export const WorkScheduleCalendar: FC<{
  workDays: TWorkDay[];
  onDaySelect: (day: TWorkDay) => void;
}> = ({ workDays, onDaySelect }) => {
  const handleSelect = (date: Date) => {
    console.log(date.toDateString())
    const existingDay = workDays.find((day) => day.date && new Date(day.date).toLocaleDateString('en-CA') === date.toLocaleDateString('en-CA'));
    if (existingDay) {
      onDaySelect(existingDay);
    } else {
      const newWorkDay: TWorkDay = { 
          date: date.toLocaleDateString('en-CA'), 
          startHour: 9, 
          startMinute: 0, 
          endHour: 17, 
          endMinute: 0 
      };
      onDaySelect(newWorkDay);
    }
  };

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="p-4 custom-datepicker">
      <DatePicker
        selected={null}
        onChange={() => { }}
        inline
        highlightDates={workDays
          .filter(day => day.date !== null)
          .map(day => ({
            'react-datepicker__day--highlighted-custom': [new Date(day.date as string)],
          }))}
        locale="ru"
        placeholderText="Выберите рабочие дни"
        onSelect={(date) => handleSelect(date as Date)}
        minDate={minDate}
      />
    </div>
  );
};
