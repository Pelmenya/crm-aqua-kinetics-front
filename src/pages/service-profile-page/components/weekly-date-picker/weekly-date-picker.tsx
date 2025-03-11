import { TWorkDay } from '@/shared/lib/types/t-work-day';
import { FC, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';



const getWeekStartDate = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
};


export const WeeklyDatePicker: FC<{
    workDays: TWorkDay[];
    onDaySelect: (day: TWorkDay) => void;
    onSave: (days: TWorkDay[]) => void;
}> = ({ workDays, onDaySelect, onSave }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDate(new Date()));

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

    const weekDates = Array.from({ length: 7 }, (_, i) => new Date(currentWeekStart.getTime() + i * 24 * 60 * 60 * 1000));

    const goToPreviousWeek = () => {
        setCurrentWeekStart(new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000));
    };

    const goToNextWeek = () => {
        setCurrentWeekStart(new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000));
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Выберите рабочие дни (Неделя)</h2>
            <div className="flex space-x-2 mb-4">
                <button className="btn" onClick={goToPreviousWeek}>Previous Week</button>
                <button className="btn" onClick={goToNextWeek}>Next Week</button>
            </div>
            <div className="flex space-x-2">
                {weekDates.map((date) => (
                    <button
                        key={date.toDateString()}
                        className={`p-2 border ${workDays.some(d => d.date.toDateString() === date.toDateString()) ? 'bg-blue-200' : ''}`}
                        onClick={() => handleSelect(date)}
                    >
                        {date.toLocaleDateString('ru', { weekday: 'short', day: 'numeric' })}
                    </button>
                ))}
            </div>
        </div>
    );
};

