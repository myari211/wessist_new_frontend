import SkeletonLoading from 'components/atoms/SkeletonLoading';
import { TableAtom } from 'components/organisms/TableOrganisms';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigationData } from 'services/redux/features/navigation/navigationThunk';
import { createRoleNavigationData, getRoleNavigationData, updateRoleNavigationData } from 'services/redux/features/roles/roleNavigationThunk';
import { getRolesData } from 'services/redux/features/roles/roleThunk';
import { columns } from './columns/columns';
import { formFields } from './form';
import { Page } from 'components/shared/Page';
import { showToastNotification, validatorErrors } from 'services/helper/toastHelper';

const RoleNavigation = () => {
    const title = "Role Navigation";

    const dispatch = useDispatch();
    const roles = useSelector((state) => state.roles.data);
    const navigation = useSelector((state) => state.navigation.data.child);
    const roleNavigation = useSelector((state) => state.roleNavigation.data);

    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getRoleNavigationData());

            if(!roles || roles.length === 0) {
                await dispatch(getRolesData());
            }

            if(!navigation || navigation.length === 0) {
                await dispatch(getNavigationData());
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    const handleCreate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(createRoleNavigationData(formData));
            if(createRoleNavigationData.fulfilled.match(result)) {
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
            console.warn(error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleUpdate = async (onSuccess) => {
        try {
            setButtonLoading(true);
            const result = await dispatch(updateRoleNavigationData(formData));
            if(updateRoleNavigationData.fulfilled.match(result)) {
                showToastNotification({
                    title: "Success",
                    message: "Data Updated",
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
            console.warn(error);
        }
        finally {
            setButtonLoading(false);
        }
    }

    const handleDelete = () => {

    }

    return(
        <>
            <Page title="Role Navigation">
                <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                            {title}
                        </h2>
                        {!loading ? (
                            <>
                                <TableAtom
                                    data={roleNavigation}
                                    columns={columns}
                                    form={formFields(formData, roles, navigation)}
                                    buttonLoading={buttonLoading}
                                    handleCreate={handleCreate}
                                    handleUpdate={handleUpdate}
                                    handleDelete={handleDelete}
                                    formData={formData}
                                    setFormData={setFormData}
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

export default RoleNavigation;