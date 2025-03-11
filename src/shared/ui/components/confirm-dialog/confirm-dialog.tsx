import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FC, Fragment } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
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
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6"
                                >
                                    {title}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm">
                                        {message}
                                    </p>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onConfirm}
                                    >
                                        Подтвердить
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};