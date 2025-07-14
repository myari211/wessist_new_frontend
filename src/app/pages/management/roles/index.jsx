import { TableAtom } from 'components/organisms/TableOrganisms';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRolesData, getRolesData, updateRolesData } from 'services/redux/features/roles/roleThunk';
import { columns } from './columns/columns';
import { formFields } from './form';
import SkeletonLoading from 'components/atoms/SkeletonLoading';
import { Page } from "components/shared/Page";
import { validatorErrors } from 'services/helper/toastHelper';

const Roles = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.roles.data);
    const title = "Roles";
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        const getRoles = async () => {
            setLoading(true);
            await dispatch(getRolesData());
            setLoading(false);
        }

        getRoles();
    }, [dispatch]);

    const handleCreate = async(onSuccess) => {
        setButtonLoading(true);
        try {
            const result = await dispatch(createRolesData(formData));

            if(createRolesData.fulfilled.match(result)) {
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

    const handleUpdate = async(onSuccess) => {
        try {
            setButtonLoading(true);
            await dispatch(updateRolesData(formData));
            onSuccess();
        }
        catch(err) {
            console.warn(err.message);
        }
        finally {
            setButtonLoading(false);
        }
    }

    return(
        <>
            <Page title="Navigation">
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

export default Roles;