import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import { 
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
import { IdCell } from "./rows";
import { Table, TBody, Td, Th, THead, Tr, Button } from "components/ui";
import { Fragment } from "react";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
    }),
    columnHelper.accessor((row) => row.category, {
        id: "category",
        header: "Category",
        cell: IdCell,
    })
];

export const customColumns = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "Name",
    }),
    columnHelper.accessor((row) => row.guard_name, {
        id: "guard_name",
        header: "Guard",
    }),
    columnHelper.accessor((row) => row.category, {
        id: "category",
        header: "Category",
    }),
    columnHelper.accessor((row) => row.actions, {
        id: "actions",
        header: "Actions",
    })
];

function IconOne() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="size-6"
        >
            <path strokeLinecap="round"
            strokeLinejoin="round" 
            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" 
            strokeOpacity={0.7}
            strokeWidth="2"
            />
            
            <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.867 19.125h.008v.008h-.008v-.008Z"
            strokeOpacity={0.7}
            strokeWidth="2"
            />
        </svg>
    );
}

function IconTwo() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="red" 
            className="size-6"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    );
}

export function customCell(data, {
        open,
        setFormData, 
        setMode
    }) {
    if(!Array.isArray(data)) {
        console.log("data", data);
        return (
            <div className="p-3 text-center text-sm text-gray=500">
                No Data Available
            </div>
        )
    }

    const solutions = [
        {
            name: "Edit Data",
            description: `Edit Data Here.`,      
            icon: IconOne,
            action: (row) => {
                setFormData(row);
                setMode("update")
                open();
            },
        },
        {
        name: "Delete Data",
            description: `Delete Data Here`,
            href: "##",
            icon: IconTwo,
            action: (row) => {
                setFormData(row);
                setMode("delete");
                open();
            },
        },
    ]

    return(
        <div className="bg-gray-50 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-500 rounde-0">
            <Table className="w-full text-sm">
                <THead>
                    <Tr>
                        {customColumns.map((item) => (
                            <Th
                                key={item.id}
                                className="font-semibold uppercase text-gray-800 dark:bg-dark-800 dark:text-dark-100 first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first-rtl:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-trl-lg last:rtl:rounded-tl-lg"
                            >
                                <div className="flex cursor-pointer select-none items-center space-x-3">
                                    {item.header}
                                </div>
                            </Th>
                        ))}
                    </Tr>
                </THead>
                <TBody key="tbodyColumns">
                    { data.map((item) => {
                        return(
                            <Fragment key={item.id}>
                                <Tr className="relative border-y border-transparent border-b-gray-200 dark:border-b-dark-500">
                                    <Td>{item.name}</Td>
                                    <Td>{item.guard_name}</Td>
                                    <Td>{item.category}</Td>
                                    <Td key="actions">
                                        <Popover className="relative w-full">
                                            <PopoverButton as={Button}>
                                                <EllipsisVerticalIcon className="size-4.5" />
                                            </PopoverButton>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out"
                                                enterFrom="opacity-0 translate-y-2"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-2"
                                            >
                                                <PopoverPanel
                                                    anchor={{ to: "bottom start", gap: 8 }}
                                                    className="z-[100] w-96 overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg shadow-gray-200/50 outline-none ring-primary-500/50 focus-visible:outline-none focus-visible:ring dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
                                                >
                                                    <div className="relative grid gap-8 p-7">
                                                        {solutions.map((list) => (
                                                            <a
                                                                key={list.name}
                                                                onClick={() => list.action(item)}
                                                                className="-m-3 flex items-center space-x-2 rounded-lg p-2 outline-none transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-600 "
                                                            >
                                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-primary-500 dark:bg-dark-600 dark:text-primary-400">
                                                                    { React.createElement(list.icon, { 'aria-hidden': true }) }
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-dark-50">
                                                                        {list.name}
                                                                    </p>
                                                                    <p className="text-xs-plus">{list.description}</p>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </PopoverPanel>
                                            </Transition>
                                        </Popover>
                                    </Td>
                                </Tr>
                            </Fragment>
                        );
                    })}
                </TBody>
            </Table>
        </div>
    )
}