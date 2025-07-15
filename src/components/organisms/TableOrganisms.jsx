// Local Imports
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import clsx from "clsx";
import { useRef, useState, Fragment } from "react";
import { useDisclosure } from "hooks";

// Import Dependencies
import { CollapsibleSearch } from "components/shared/CollapsibleSearch";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { Card, Table, THead, TBody, Th, Tr, Td, Button, Collapse } from "components/ui";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { SelectedRowsActions } from "components/shared/table/SelectedRowsActions";
import { useBoxSize, useDidUpdate } from "hooks";
import { useSkipper } from "utils/react-table/useSkipper";
import { MenuAction } from "../atoms/MenuActions";
import { PaginationSection } from "../atoms/PaginationSection";
import { getUserAgentBrowser } from "utils/dom/getUserAgentBrowser";
import FormAction from "../atoms/FormAction";
import { customCell } from "app/pages/management/permission/columns/columns";

// ----------------------------------------------------------------------

const isSafari = getUserAgentBrowser() === "Safari";

export function TableAtom({ data, columns, title, form, handleCreate, handleUpdate, handleDelete, buttonLoading, formData, setFormData, action }) {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const theadRef = useRef();
  const { height: theadHeight } = useBoxSize({ ref: theadRef });
  const [products, setProducts] = useState([...data]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [mode, setMode] = useState("create");

  const table = useReactTable({
    data: data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    meta: {
      deleteRow: (row) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setProducts((old) =>
          old.filter((oldRow) => oldRow.product_id !== row.original.product_id),
        );
      },
      deleteRows: (rows) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => row.original.product_id);
        setProducts((old) =>
          old.filter((row) => !rowIds.includes(row.product_id)),
        );
      },
    },
    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
    renderSubComponent: (row) => customCell(row.original.permissions),

    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [products]);
  const [isOpen, {open, close}] = useDisclosure(false);

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

  const solutions = [
    {
      name: "Edit Data",
      description: `Edit ${title} Data Here.`,      
      icon: IconOne,
      action: (row) => {
        setFormData(row);
        setMode("update")
        open();
      },
    },
    {
      name: "Delete Data",
      description: `Delete ${title} Data Here`,
      href: "##",
      icon: IconTwo,
      action: (row) => {
        setFormData(row);
        setMode("delete");
        open();
      },
    },
  ]

  function EmptyState () {
    return(
       <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-500 dark:text-dark-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5L18 12.75M18 12.75l2.25 2.25M18 12.75L15.75 15M18 12.75l2.25-2.25M12 6.75v10.5M9 9.75l-2.25 2.25M6.75 12l-2.25 2.25M6.75 12l2.25 2.25"
          />
        </svg>
        <span className="text-sm font-medium">No data found</span>
      </div>
    )
  }

  return (
    <>
      <div className="col-span-12 flex flex-col lg:col-span-8 xl:col-span-9">
        <div className="table-toolbar flex items-center justify-end">
          <div className="flex">
            <CollapsibleSearch
              placeholder="Search here..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <MenuAction />
            {form != false && (
              <Button color="info" onClick={() => {
                setFormData({});
                setMode("create");
                open();
              }}>
                Create
              </Button>
            )}
          </div>
        </div>
        <Card className="relative mt-3 flex grow flex-col">
          <div className="table-wrapper min-w-full grow overflow-x-auto">
            <Table hoverable className="w-full text-left rtl:text-right">
              <THead ref={theadRef}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        className="bg-gray-200 font-semibold uppercase text-gray-800 dark:bg-dark-800 dark:text-dark-100 first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg text-center ${className}"
                      >
                        {header.column.getCanSort() ? (
                          <div
                            className="flex cursor-pointer select-none items-center space-x-3 "
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="flex-1">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </span>
                            <TableSortIcon sorted={header.column.getIsSorted()} />
                          </div>
                        ) : header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </Th>
                      
                    ))}
                    {action != false && (
                      <Th
                        key="actions"
                        className="bg-gray-200 font-semibold uppercase text-gray-800 dark:bg-dark-800 dark:text-dark-100 first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg"
                      >
                        Actions
                      </Th>
                    )}
                  </Tr>
                ))}
              </THead>
                <TBody>
                  {table.getRowModel().rows.length === 0 
                  ? (
                    <>
                      <Tr>
                        <Td colspan={columns.length + 1}>
                          <EmptyState />
                        </Td>
                      </Tr>
                    </>
                    ) : (
                      table.getRowModel().rows.map((row) => {
                      return (
                        <>
                        <Tr
                          key={row.id}
                          className={clsx(
                            "relative border-y border-transparent border-b-gray-200 dark:border-b-dark-500",
                            row.getIsSelected() &&
                              !isSafari &&
                              "row-selected after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500",
                          )}
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <Td key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </Td>
                            );
                          })}
                          {action != false && (
                            <Td key="actions">
                              <Popover className="relative w-full">
                                <PopoverButton 
                                  as={Button}
                                  className="inline-flex items-center justify-center size-10 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-dark-600 focus:outline-none"
                                >
                                  <EllipsisVerticalIcon className="size-4.5 text-gray-500 dark:text-gray-300" />
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
                                      {solutions.map((item) => (
                                        <a
                                          key={item.name}
                                          onClick={() => item.action(row.original)}
                                          className="-m-3 flex items-center space-x-2 rounded-lg p-2 outline-none transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-600 "
                                        >
                                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-primary-500 dark:bg-dark-600 dark:text-primary-400">
                                            <item.icon aria-hidden="true" />
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-dark-50">
                                              {item.name}
                                            </p>
                                            <p className="text-xs-plus">{item.description}</p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </PopoverPanel>
                                </Transition>
                              </Popover>
                            </Td>
                          )}
                        </Tr>
                        <Tr>
                          <td
                            colSpan={columns.length + 1}
                            className="p-0"
                          >
                            <Collapse in={row.getIsExpanded()}>
                              {customCell(row.original.permission, {
                                open,
                                setFormData,
                                setMode
                              })}
                            </Collapse>
                          </td>
                        </Tr>
                        </>
                      );
                    }))}
                </TBody>
            </Table>
          </div>
          {table.getCoreRowModel().rows.length && (
            <div className="p-4 sm:p-5">
              <PaginationSection table={table} />
            </div>
          )}{" "}
          <SelectedRowsActions table={table} height={theadHeight} />
        </Card>
      </div>

      {form != false && (
        <FormAction
          isOpen={isOpen}
          open={open}
          close={close}
          title={title}
          form={form}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          buttonLoading={buttonLoading}
          formData={formData}
          setFormData={setFormData}
          mode={mode}
        />
      )}
    </>
  );
}
