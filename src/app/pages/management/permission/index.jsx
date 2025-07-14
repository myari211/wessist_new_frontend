import SkeletonLoading from "components/atoms/SkeletonLoading";
import { TableAtom } from "components/organisms/TableOrganisms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPermissionData, deletePermissionData, getPermissionData, updatePermissionData } from "services/redux/features/permission/permissionThunk";
import { columns } from "./columns/columns";
import { formFields } from './form';
import { Page } from "components/shared/Page";
import { showToastNotification, validatorErrors } from "services/helper/toastHelper";

const Permissions = () => {
    const title = "Permission"
    const dispatch = useDispatch();
    const permission = useSelector((state) => state.permission.data);

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    console.log("formData", formData);

    useEffect(() => {
        const getPermission = async() => {
            setLoading(true);
            await dispatch(getPermissionData());
            setLoading(false);
        }

        getPermission();
    }, [dispatch]);

    const handleCreate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const response = await dispatch(createPermissionData(formData));
            if(createPermissionData.fulfilled.match(response)) {
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
            setButtonLoading(false);
        }
    }

    const handleUpdate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const response = await dispatch(updatePermissionData(formData));
            if(updatePermissionData.fulfilled.match(response)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Updated",
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
            setButtonLoading(false);
        }
    }

    const handleDelete = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const response = await dispatch(deletePermissionData(formData));
            if(deletePermissionData.fulfilled.match(response)) {
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
            <Page title="Permission">
                <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                            {title}
                        </h2>
                        {!loading ? (
                            <>
                                <TableAtom 
                                    data={permission}
                                    buttonLoading={buttonLoading}
                                    columns={columns}
                                    form={formFields(formData)}
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleCreate={handleCreate}
                                    handleUpdate={handleUpdate}
                                    handleDelete={handleDelete}
                                    action={false}
                                />
                            </>
                        ) : (
                            <SkeletonLoading />
                        )}
                    </div>
                </div>
            </Page>
        </>
    )
}

export default Permissions;