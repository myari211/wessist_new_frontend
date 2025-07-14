import PropTypes from 'prop-types';
import { toast } from "sonner";
import { Button } from "components/ui";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/20/solid';

const CustomNotification = ({ title, message, toastId }) => (
    <>
        <div
            role="alert"
            className="flex items-center space-x-2 rounded-lg bg-white px-4 py-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white sm:px-5"
        >
            <BellAlertIcon className="size-6 text-blue-500 dark:text-blue-400" />
            <span className="flex-1 font-medium">
                <strong>{title}</strong>: {message}
            </span>
            <Button
                onClick={() => toast.dismiss(toastId)}
                unstyled
                className="size-6 shrink-0 rounded-full p-0 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 dark:text-white dark:hover:bg-white/20"
            >
                <XMarkIcon className="size-4" />
            </Button>
        </div>
    </>
);

CustomNotification.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    toastId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default CustomNotification;