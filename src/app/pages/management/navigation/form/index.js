export const formFields = (master = [], formData = {}) => {
    return [
        {
            type: "text",
            col: 24,
            name: 'title',
            label: 'Navigation Title',
            value: formData?.title,
        },
        {
            type: "text",
            col: 24,
            name: "route",
            label: "Navigation Route",
            value: formData?.route,
        },
        {
            type: "select",
            col: 12,
            name: "parent_id",
            label: "Parent",
            options: master.map((item) => ({
                value: item.id,
                label: item.title,
            })),
            value: formData?.parent_id,
        },
        {
            type: "number",
            col: 12,
            name: "order",
            label: "Order",
            value: formData?.order,
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
    ];
}