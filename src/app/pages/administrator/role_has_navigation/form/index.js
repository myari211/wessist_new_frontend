export const formFields = (formData = {}, role = [], navigation = []) => {
    return [
        { 
            type: "select",
            col: 24,
            name: 'role_id',
            label: 'Role',
            value: formData?.role_id,
            options: role.map((item) => ({
                value: item.id,
                label: item.name,
            }))
        },
        {
            type: "multiselect",
            col: 24,
            name: "navigation_id",
            label: "Navigation",
            value: formData?.navigation,
            options: navigation.map((item) => ({
                value: item.id,
                label: item.title,
            })),
        }
    ]
}
