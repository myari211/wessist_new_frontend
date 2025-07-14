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
    columnHelper.accessor((row) => row.first_name, {
        id: "first_name",
        header: "First Name",
    }),
    columnHelper.accessor((row) => row.last_name, {
        id: "last_name",
        header: "Last Name",
    }),
    columnHelper.accessor((row) => row.phone, {
        id: "phone",
        header: "Mobile Number",
    }),
    columnHelper.accessor((row) => row.email, {
        id: "email",
        header: "Email",
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


