export const formFields = (formData = {}) => {
    return [
        {
            type: "text",
            col: 24,
            name: "name",
            label: "Permission Name",
            value: formData?.name,
        },
        {
            type: "text",
            col: 24,
            name: "category",
            label: "Category",
            value: formData?.category,
        }
    ];
}