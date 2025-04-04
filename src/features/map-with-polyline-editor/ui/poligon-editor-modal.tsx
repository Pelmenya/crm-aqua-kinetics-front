import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FC, Fragment, useState, useEffect } from 'react';

interface PolygonEditorModalProps {
    isOpen: boolean;
    workDay: { day: string; name: string; color: string; coordinates: number[][] };
    onClose: () => void;
    onSave: (workDay: { day: string; name: string; color: string; coordinates: number[][] }) => void;
    onRemove: () => void;
}

export const PolygonEditorModal: FC<PolygonEditorModalProps> = ({
    isOpen,
    workDay,
    onClose,
    onSave,
    onRemove,
}) => {
    const [color, setColor] = useState(workDay.color);
    const [name, setName] = useState(workDay.name);

    useEffect(() => {
        setColor(workDay.color);
        setName(workDay.name);
    }, [workDay]);

    const handleSave = () => {
        onSave({ ...workDay, color, name });
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
                                    Редактировать полигон
                                </DialogTitle>
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label className="block mb-2">Название:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">Цвет:</label>
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="input w-full h-10"
                                        />
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
