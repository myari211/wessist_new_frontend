import {
  Dialog,
  DialogPanel,
//   DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { Row, Col } from 'antd';
import { Input } from "components/ui";
import { Fragment, useRef } from "react";
import { Select, Switch, Button } from "components/ui";
import MultiSelect from "react-tailwindcss-select";
import { handleCheckBoxChange, handleInputChange, handleMultiSelectChange } from "services/helper/formHelper";


const FormAction = ({ isOpen, close, title, form, handleCreate, handleUpdate, handleDelete, buttonLoading, setFormData, formData, mode }) => {
    const applyRef = useRef(null);

    const handleSubmit = async () => {
        try {
            if(mode === "create") {
                await handleCreate(close);
            }
            else if(mode === "update") {
                await handleUpdate(close);
            }
            else if(mode === "delete") {
                await handleDelete(close);
            }
        }
        catch(err) {
            console.log("Form Action", err);
        }
    }

    return(
        <>
            {/* <Button onClick={open}>Shift Up</Button> */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
                    onClose={close}
                    initialFocus={applyRef}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/30" />
                    </TransitionChild>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 [transform:translate3d(0,1rem,0)]"
                        enterTo="opacity-100 [transform:translate3d(0,0,0)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 [transform:translate3d(0,0,0)]"
                        leaveTo="opacity-0 [transform:translate3d(0,1rem,0)]"
                    >
                        <DialogPanel className="scrollbar-sm relative flex w-full max-w-2xl flex-col overflow-y-auto rounded-lg bg-white p-5 transition-all duration-300 dark:bg-dark-700">
                            <Row>
                                <Col span={24} className="text-center">
                                    <h2 className="text-bold">{title}</h2>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                {form?.map((item) => (
                                    <Col key={item.name} span={item.col} className="mt-4">
                                        {(item.type == "text" || item.type == "number" || item.type == "email" || item.type == "password") && (
                                            <Input type={item.type} name={item.name} label={item.label} onChange={handleInputChange(setFormData, formData)} value={item.value} />
                                        )}

                                        {item.type == "select" && (
                                            <Select 
                                                label={item.label} 
                                                onChange={(e) => handleMultiSelectChange(setFormData)(e.target.value, item.name)} defaultValue={item.value} 
                                                className="h-10"
                                            >
                                                <option value="">
                                                    -- Pilih {item.label} --
                                                </option>
                                                {item.options.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>   
                                                ))}
                                            </Select>
                                        )}

                                        {item.type == "multiselect" && (
                                            <MultiSelect
                                                isMultiple
                                                primaryColor="indigo"
                                                onChange={(e) => handleMultiSelectChange(setFormData)(e.target.value, item.name)}
                                                options={item.options}
                                                classNames={{
                                                    container: () => "w-full",
                                                    menu: () =>  "bg-white dar:bg-dark-700 border border-gray-200 dark:border-dark-500 shadow-md mt-1 rounded-md z-[999]",
                                                    listItem: () => "hover:bg-gray-100 dark:hover:bg-dark-600 px-3 py-2 text-sm cursor-pointer",
                                                    tagItem: () => "bg-gray-200 dark:bg-dark-500 text-sm rounded px-2 py-0.5 text-gray-900 dark:text-white",
                                                    tagItemIcon: () => "text-gray-500 hover:text-red-500",
                                                }}
                                            />
                                        )}

                                        {item.type == "switch" && (
                                            <Switch 
                                                onChange={handleCheckBoxChange(setFormData, formData)}
                                                color="success"
                                                defaultChecked
                                                variant="outlined"
                                                label="Active"
                                            />
                                        )}
                                    </Col>
                                ))}
                            </Row>
                            <hr className="my-4 mt-16 h-px border-gray-200 dark:border-dark-500" />
                            <div className="space-x-3 text-end">
                                <Button
                                    onClick={close}
                                    variant="outlined"
                                    className="min-w-[7rem] rounded-full"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    // onClick={close}
                                    color="primary"
                                    ref={applyRef}
                                    className="min-w-[7rem] rounded-full"
                                    onClick={handleSubmit}
                                    loading={buttonLoading}
                                >
                                    Apply
                                </Button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </>
    )
}

export default FormAction;