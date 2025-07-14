export const formFields = (formData = {}) => {
    return [
        {
            type: "text",
            col: 12,
            name: "first_name",
            label: "First Name",
            value: formData?.first_name,
        },
        {
            type: 'text',
            col: 12,
            name: "last_name",
            label: "Last Name",
            value: formData?.last_name,
        },
        {
            type: "email",
            col: 24,
            name: "email",
            label: "Email",
            value: formData?.email,
        },
        {
            type: "password",
            col: 24,
            name: "password",
            label: "Password",
            value: formData?.password,
        },
        {
            type: "number",
            col: 12,
            name: "phone",
            label: "phone",
            value: formData?.phone,
        },
        {
            type: "select",
            col: 12,
            name: "status",
            label: "Status",
            options: [
                {
                    value: 1,
                    label: "Active",
                },
                {
                    value: 0,
                    label: "Inactive",
                }
            ],
            value: formData?.status,
        }
    ]
} 