'use client'

import { useEffect, useState } from 'react';
import { Page } from "components/shared/Page";
import { TableAtom } from '../../../../components/organisms/TableOrganisms';
import { columns } from "./columns/columns";
import { getNavigationData, createNavigationData, updateNavigationData, deleteNavigationData } from 'services/redux/features/navigation/navigationThunk';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from 'components/atoms/SkeletonLoading';
import { formFields } from './form';
import { showToastNotification, validatorErrors } from 'services/helper/toastHelper';



const Navigation = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.navigation.data.all);
    const master = useSelector((state) => state.navigation.data.master);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const title = "Navigation";

    useEffect(() => {
        const getNavigation = async () => {
            setLoading(true);
            await dispatch(getNavigationData());
            setLoading(false);
        }

        getNavigation();
    }, [dispatch]);

    const handleCreate = async (onSuccess) => {
        setButtonLoading(true);
        try {
            const result = await dispatch(createNavigationData(formData));

            if(createNavigationData.fulfilled.match(result)) {
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
        }
        catch(error) {
            console.error('Unexpected Error', error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleUpdate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(updateNavigationData(formData));

            if(updateNavigationData.fulfilled.match(result)) {
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
        catch(error) {
            console.error('Unexpected Error', error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleDelete = async(onSuccess) => {
        setButtonLoading(true);
        try {
            const result = await dispatch(deleteNavigationData(formData));
            if(deleteNavigationData.fulfilled.match(result)) {
                onSuccess?.();
            }
            else {
                validatorErrors(result.payload);
            }
        }
        catch(error) {
            console.warn(error.message);
        }
        finally {
            setButtonLoading(false);
        }
    }

    return(
        <Page title="Navigation">
            <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
                <div className="min-w-0">
                    <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                        {title}
                    </h2>
                    {!loading ? (
                        <TableAtom
                            title={title}
                            data={data}
                            columns={columns}
                            form={formFields(master, formData)}
                            handleCreate={handleCreate}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            buttonLoading={buttonLoading}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ) : (
                        <div className="w-full">
                            <SkeletonLoading />
                        </div>
                    )}
                </div>
            </div>
        </Page>
    )
}

export default Navigation;