import { createColumnHelper } from "@tanstack/react-table";
import {
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
// import { Badge } from "components/ui";

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
    }),
    columnHelper.accessor((row) => row.navigations, {
        id: "navigations",
        header: "Navigations",
    })
]