import { TableAtom } from "components/organisms/TableOrganisms";

export function ActivityList({ data, columns, title, form, action }) {
    return(
        <TableAtom
            data={data}
            columns={columns}
            title={title}
            form={form}
            action={action}
        />
    )
}