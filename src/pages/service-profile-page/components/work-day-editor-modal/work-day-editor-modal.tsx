import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState, useEffect } from 'react';
import { TWorkDay } from "@/shared/lib/types/t-work-day";

interface WorkDayEditorModalProps {
  isOpen: boolean;
  workDay: TWorkDay;
  onClose: () => void;
  onSave: (day: TWorkDay) => void;
  onRemove: () => void;
}

export const WorkDayEditorModal: FC<WorkDayEditorModalProps> = ({ isOpen, workDay, onClose, onSave, onRemove }) => {
  const [startHour, setStartHour] = useState(workDay.startHour);
  const [endHour, setEndHour] = useState(workDay.endHour);

  useEffect(() => {
    setStartHour(workDay.startHour);
    setEndHour(workDay.endHour);
  }, [workDay]);

  const handleSave = () => {
    onSave({ ...workDay, startHour, endHour });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Редактировать рабочий день
                </Dialog.Title>
                <div className="mt-2">
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
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
                  <button className="btn btn-secondary" onClick={onRemove}>Удалить</button>
                  <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
