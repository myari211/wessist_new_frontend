import { createColumnHelper } from "@tanstack/react-table";
import {
    SelectCell, 
    SelectHeader
} from "components/shared/table/SelectCheckbox";
import { NameCell } from "../rows";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
    }),
    columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "Name",
        cell: NameCell,
    }),
    columnHelper.accessor((row) => row.activity, {
        id: "activity",
        header: "Activity",
    }),
    columnHelper.accessor((row) => row.datetime, {
        id: "datetime",
        header: "Datetime",
    })
]