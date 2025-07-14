import { createColumnHelper } from "@tanstack/react-table";
import { SelectCell, SelectHeader } from "components/shared/table/SelectCheckbox";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
    }),

    columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "name",
    }),

    columnHelper.accessor((row) => row.guard_name, {
        id: "guard_name",
        header: "Guard Name",
    }),
]