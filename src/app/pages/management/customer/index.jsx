import { useState, useEffect } from 'react';
import { createCustomerData, deleteCustomerData, getCustomerData, updateCustomerData } from 'services/redux/features/customer/customerThunk';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from 'components/atoms/SkeletonLoading';
import { TableAtom } from 'components/organisms/TableOrganisms';
import { columns } from './columns/columns';
import { formFields } from './form';
import { showToastNotification, validatorErrors } from 'services/helper/toastHelper';
import { Page } from 'components/shared/Page';

const Customer = () => {
    const dispatch = useDispatch();
    const title = "Customer";
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [buttonLoading, setButtonLoading] = useState(false);

    const customer = useSelector((state) => state.customer.data);
    
    useEffect(() => {
        const getCustomer = async() => {
            setLoading(true);
            await dispatch(getCustomerData());
            setLoading(false);
        }

        getCustomer();
    }, []);

    const handleCreate = async(onSuccess) => {
        try {
            setButtonLoading(true);
            const response = await dispatch(createCustomerData(formData));
            if(createCustomerData.fulfilled.match(response)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Created",
                    type: "success",
                })
                onSuccess?.();
            }
            else {
                validatorErrors(response.payload);
                throw response;
            }
        }
        catch(error) {
            console.error('Unexpected error', error);
        }
        finally {
            setButtonLoading(false)
        }
    }

    const handleUpdate = async(onSuccess) => {
        try {
            setButtonLoading(true);
            const response = await dispatch(updateCustomerData(formData));
            if(updateCustomerData.fulfilled.match(response)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Updated",
                    type: "success",
                });
                onSuccess?.();
            }
            else {
                validatorErrors(response.payload);
                throw response;
            }
        }
        catch(error) {
            console.error('Unexpected error', error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleDelete = async(onSuccess) => {
        try {
            setButtonLoading(false);
            const response = await dispatch(deleteCustomerData(formData));
            if(deleteCustomerData.fulfilled.match(response)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Deleted",
                    type: "success",
                });
                onSuccess?.();
            }
            else {
                validatorErrors(response.payload);
                throw response;
            }
        }
        catch(error) {
            console.error('Unexpected error', error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    return(
        <>
            <Page title="Customer">
                <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                            {title}
                        </h2>
                        {!loading ? (
                            <TableAtom
                                title={title}
                                data={customer}
                                columns={columns}
                                form={formFields(formData)}
                                formData={formData}
                                setFormData={setFormData}
                                handleCreate={handleCreate}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                                buttonLoading={buttonLoading}
                            />
                        ) : (
                            <SkeletonLoading />
                        )}
                    </div>
                </div>
            </Page>
        </>
    )
}

export default Customer;