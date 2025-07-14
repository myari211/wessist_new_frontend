import { createColumnHelper } from "@tanstack/react-table";
import {
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
import { Badge } from "components/ui";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
    }),
    columnHelper.accessor((row) => row.title, {
        id: "title",
        header: "Title",
    }),
    columnHelper.accessor((row) => row.route, {
        id: "route",
        header: "Route",
    }),
    columnHelper.accessor((row) => row.parent?.title ?? "No Parent", {
        id: "parent_id",
        header: "Parent ID",
        cell: ({ getValue }) => {
            return(
                <Badge variant="outlined" className="rounded-full" color="primary">
                    { getValue() }
                </Badge>
            )
        }
    }),
    columnHelper.accessor((row) => row.order, {
        id: "order",
        header: "Order",
    }),
    columnHelper.accessor((row) => row.status, {
        id: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();
            const isActive = status == 1;
            return(
                <Badge variant="outlined" className="rounded-full" color={isActive ? "success" : "secondary"}>
                    {isActive ? "Active" : "Inactive"}
                </Badge>
            )
        }
    })
]