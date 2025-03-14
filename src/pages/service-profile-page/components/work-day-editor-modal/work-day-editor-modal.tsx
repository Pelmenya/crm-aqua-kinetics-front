import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FC, Fragment, useState, useEffect } from 'react';
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { Counter } from "@/shared/ui/components/counter/counter";

interface WorkDayEditorModalProps {
    isOpen: boolean;
    workDay: TWorkDay;
    onClose: () => void;
    onSave: (day: TWorkDay) => void;
    onRemove: () => void;
    date?: Date;
}

export const WorkDayEditorModal: FC<WorkDayEditorModalProps> = ({
    isOpen,
    workDay,
    onClose,
    onSave,
    onRemove,
    date,
}) => {
    const [startHour, setStartHour] = useState(workDay.startHour);
    const [startMinute, setStartMinute] = useState(workDay.startMinute);
    const [endHour, setEndHour] = useState(workDay.endHour);
    const [endMinute, setEndMinute] = useState(workDay.endMinute);

    useEffect(() => {
        setStartHour(workDay.startHour);
        setStartMinute(workDay.startMinute);
        setEndHour(workDay.endHour);
        setEndMinute(workDay.endMinute);
    }, [workDay]);

    const handleSave = () => {
        onSave({ 
            ...workDay, 
            date: date ? new Date(date).toLocaleDateString('en-CA') : null, // Преобразуем дату в строку ISO, если она существует
            startHour, 
            startMinute, 
            endHour, 
            endMinute 
        });
        console.log("DATE PROP:", date)
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div className="fixed inset-0 bg-base-300 opacity-70" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-base-100 shadow-xl rounded-2xl">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-center">
                                    {date ? 'Редактировать рабочий день ' + date.toLocaleDateString() : 'Редактировать рабочий день'}
                                </DialogTitle>
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label className="block mb-2">Начало рабочего дня:</label>
                                        <div className="flex gap-2">
                                            Часы:
                                            <Counter
                                                count={startHour}
                                                onIncrement={() => setStartHour((prev) => Math.min(prev + 1, 23))}
                                                onDecrement={() => setStartHour((prev) => Math.max(prev - 1, 0))}
                                            />
                                            Минуты:
                                            <Counter
                                                count={startMinute}
                                                onIncrement={() => setStartMinute((prev) => (prev + 1) % 60)}
                                                onDecrement={() => setStartMinute((prev) => (prev + 59) % 60)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">Конец рабочего дня:</label>
                                        <div className="flex gap-2">
                                            Часы:
                                            <Counter
                                                count={endHour}
                                                onIncrement={() => setEndHour((prev) => Math.min(prev + 1, 23))}
                                                onDecrement={() => setEndHour((prev) => Math.max(prev - 1, 0))}
                                            />
                                            Минуты:
                                            <Counter
                                                count={endMinute}
                                                onIncrement={() => setEndMinute((prev) => (prev + 1) % 60)}
                                                onDecrement={() => setEndMinute((prev) => (prev + 59) % 60)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex pt-4 justify-center space-x-2">
                                    <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
                                    <button className="btn btn-secondary" onClick={onRemove}>Удалить</button>
                                    <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
