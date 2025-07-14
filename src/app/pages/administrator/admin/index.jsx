import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdministratorData, deleteAdministratorData, getAdministratorData, updateAdministratorData } from 'services/redux/features/administrator/administratorThunk';
import { TableAtom } from '../../../../components/organisms/TableOrganisms';
import { columns } from './columns/columns';
import { formFields } from './form';
import { Page } from 'components/shared/Page';
import SkeletonLoading from 'components/atoms/SkeletonLoading';
import { showToastNotification, validatorErrors } from 'services/helper/toastHelper';

const Administrator = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.administrator.data);
    const title = "Administrator";

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        const getAdministrator = async() => {
            setLoading(true);
            await dispatch(getAdministratorData());
            setLoading(false);
        }

        getAdministrator();
    }, [dispatch]);

    const handleCreate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(createAdministratorData(formData));

            if(createAdministratorData.fulfilled.match(result)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Created",
                    type: "success",
                });
                onSuccess?.();
            }
            else {
                validatorErrors(result.payload);
                throw result;
            }

            setButtonLoading(false);
        }
        catch(err) {
            console.warn(err);
        }
        
        setButtonLoading(false);
    }

    const handleUpdate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(updateAdministratorData(formData));

            if(updateAdministratorData.fulfilled.match(result)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Updated",
                    type: "success",
                })
                onSuccess?.();
            }
            else {
                validatorErrors(result.payload);
                throw result;
            }
        }
        catch(err) {
            console.error('Unexpected Error', err);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleDelete = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(deleteAdministratorData(formData));
            if(deleteAdministratorData.fulfilled.match(result)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Deleted",
                    type: "success",
                })
                onSuccess?.();
            }
            else {
                validatorErrors(result.payload);
                throw result;
            }
        }
        catch(err) {
            console.error('Unexpecter Error', err);
        }
        finally {
            setButtonLoading(false);
        }
    }

    return(
        <>
            <Page title="Administrator">
                <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                            {title}
                        </h2>
                        {!loading ? (
                            <TableAtom 
                                data={data}
                                columns={columns}
                                title={title}
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
    );
}

export default Administrator