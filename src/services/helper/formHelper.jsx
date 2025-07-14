export const handleInputChange = (setFormData, formData) => (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
}

export const handleMultiSelectChange = (setFormData) => (selectedOptions, name) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions,
    }));
}

export const handleCheckBoxChange = (setFormData, formData) => (e) => {
    const {name, checked} = e.target;
    setFormData({
        ...formData,
        [name]: checked
    });
}

export const clearForm = (setFormData) => () => {
    setFormData({});
}