import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { FC, useState } from "react";

export const WorkDayEditor: FC<{
    workDay: TWorkDay;
    onSave: (day: TWorkDay) => void;
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
