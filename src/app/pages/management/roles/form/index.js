export const formFields = (formData = []) => {
    return [
        {
            type: "text",
            col: 24,
            name: 'name',
            label: 'Roles Name',
            value: formData?.name,
        },
        {
            type: "text",
            col: 24,
            name: "guard_name",
            label: "Guard Name",
            value: formData?.guard_name,
        }
    ];
}