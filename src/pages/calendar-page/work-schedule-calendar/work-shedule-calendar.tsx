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
    const existingDay = workDays.find((day) => new Date(String(day.date)).toDateString() === date.toDateString());
    if (existingDay) {
      onDaySelect(existingDay);
    } else {
      const newWorkDay: TWorkDay = { date, startHour: 9, startMinute: 0, endHour: 17, endMinute: 0 }; // Default work hours
      onDaySelect(newWorkDay);
    }
  };

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="p-4 custom-datepicker"> {/* кастомный клас для переопределения интерфейса календаря*/}
      <DatePicker
        selected={null}
        onChange={() => { }}
        inline
        highlightDates={workDays
          .filter(day => day.date !== null)
          .map(day => ({
            'react-datepicker__day--highlighted-custom': [day.date as Date],
          }))
        }
        locale="ru"
        placeholderText="Выберите рабочие дни"
        onSelect={(date) => handleSelect(date as Date)}
        minDate={minDate}
      />
    </div>
  );
};
