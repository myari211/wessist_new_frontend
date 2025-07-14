import { toast } from "sonner";

export const showToastNotification = ({
    title = "Notification",
    message = "",
    type = "success",
    duration = 4000,
}) => {
    toast[type](title, {
        description: message,
        duration,
        invert: true,
        expand: false,
    });
};

export const validatorErrors = (error) => {
    const errors =
        error?.payload?.errors || error?.errors || error?.response?.data?.errors;

    if(errors && typeof errors === "object") {
        Object.values(errors).forEach((messages) => {
            messages.forEach((msg) => {
                showToastNotification({
                    title: "Input Required",
                    type: "error",
                    message: msg,
                });
            });
        });
    }
    else {
        showToastNotification({
            title: "Error",
            message:
                error?.payload?.message ||
                error?.message ||
                "Something went wrong",
            type: "error",
        });
    }
}