import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Button } from 'components/ui';
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const GlobalModal = ({ isOpen, title, message, onClose, icon, color }) => {
    const Icon = icon || CheckCircleIcon;
    const Color = color || "success";

    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
                onClose={onClose}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40" />
                </TransitionChild>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogPanel className="scrollbar-sm relative flex min-w-[500px] flex-col overflow-y-auto rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
                        <Icon className={`mx-auto inline size-28 shrink-0 text-${color}`} />
                        <DialogTitle as="h3" className="text-2xl text-gray-800 dark:text-dark-100">
                            {title}
                        </DialogTitle>
                        <p className="mt-2">{message}</p>
                        <div className="mt-6 flex justify-center">
                            <Button onClick={onClose} color={Color} className="w-fit">
                                Close
                            </Button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    )
}

export default GlobalModal