import { FC, useState } from 'react';
import { Page } from '@/shared/ui/components/page/page';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

interface WorkDay {
  date: Date;
  startHour: number;
  endHour: number;
}

const generateInitialWorkDays = (): WorkDay[] => {
  const workDays: WorkDay[] = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Генерируем рабочие дни для текущего и следующего месяца
  for (let monthOffset = 0; monthOffset <= 1; monthOffset++) {
    const month = (currentMonth + monthOffset) % 12;
    const year = currentYear + Math.floor((currentMonth + monthOffset) / 12);

    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() !== month) break; // Stop if the date goes to the next month

      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
        workDays.push({ date, startHour: 9, endHour: 17 });
      }
    }
  }

  return workDays;
};

export const ServiceCalendarPage: FC = () => {
  const [workDays, setWorkDays] = useState<WorkDay[]>(generateInitialWorkDays());
  const [selectedWorkDay, setSelectedWorkDay] = useState<WorkDay | null>(null);

  const handleSave = (days: WorkDay[]) => {
    setWorkDays(days);
    setSelectedWorkDay(null);
  };

  return (
    <Page back={true}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p>Here you can manage your schedule.</p>
        <WorkScheduleCalendar workDays={workDays} onDaySelect={setSelectedWorkDay} onSave={handleSave} />
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
    </Page>
  );
};

const WorkScheduleCalendar: FC<{
  workDays: WorkDay[];
  onDaySelect: (day: WorkDay) => void;
  onSave: (days: WorkDay[]) => void;
}> = ({ workDays, onDaySelect, onSave }) => {

  const handleSelect = (date: Date) => {
    const existingDay = workDays.find((day) => day.date.toDateString() === date.toDateString());
    if (existingDay) {
      onDaySelect(existingDay);
    } else {
      const newWorkDay = { date, startHour: 9, endHour: 17 }; // Default work hours
      onDaySelect(newWorkDay);
      onSave([...workDays, newWorkDay]);
    }
  };

  // Set the minimum date to the first day of the current month
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Выберите рабочие дни</h2>
      <DatePicker
        selected={null}
        onChange={() => {}}
        inline
        highlightDates={workDays.map(day => ({
          'react-datepicker__day--highlighted-custom': [day.date],
        }))}
        locale="ru"
        placeholderText="Выберите рабочие дни"
        onSelect={(date) => handleSelect(date as Date)}
        minDate={minDate} // Restrict selection to current month and future dates
      />
    </div>
  );
};

const WorkDayEditor: FC<{
  workDay: WorkDay;
  onSave: (day: WorkDay) => void;
  onRemove: (date: Date) => void;
}> = ({ workDay, onSave, onRemove }) => {
  const [startHour, setStartHour] = useState(workDay.startHour);
  const [endHour, setEndHour] = useState(workDay.endHour);

  const handleSave = () => {
    onSave({ ...workDay, startHour, endHour });
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Редактировать день: {workDay.date.toLocaleDateString()}</h2>
      <div className="mb-4">
        <label className="block mb-1">Начало рабочего дня:</label>
        <input
          type="number"
          min={0}
          max={23}
          value={startHour}
          onChange={(e) => setStartHour(Number(e.target.value))}
          className="border p-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Конец рабочего дня:</label>
        <input
          type="number"
          min={0}
          max={23}
          value={endHour}
          onChange={(e) => setEndHour(Number(e.target.value))}
          className="border p-1"
        />
      </div>
      <button className="btn btn-primary mr-2" onClick={handleSave}>Сохранить</button>
      <button className="btn btn-secondary" onClick={() => onRemove(workDay.date)}>Удалить</button>
    </div>
  );
};
