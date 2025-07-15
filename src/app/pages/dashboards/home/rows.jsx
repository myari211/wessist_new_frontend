import PropTypes from "prop-types";
import { Avatar } from "components/ui";
import { ensureString } from "utils/ensureString";
import { Highlight } from "components/shared/Highlight";

export function NameCell({ row, getValue, table }) {
    const globalQuery = ensureString(table.getState().globalFilter);
    const val = getValue();

    return(
        <div className="flex items-center gap-4">
            <Avatar
                size={9}
                src={row.original.avatar}
                name={row.original.name}
                initialColor="auto"
                classNames={{ display: "text-sm" }}
            />
            <div className="font-medium text-gray-800 dark:text-dark-100">
                <Highlight query={globalQuery}>{val}</Highlight>
                <p className="text-sm text-gray-400 dark:text-gray-300/50">{row.original.company}</p>
            </div>
        </div>
    )
}

NameCell.propTypes = {
    row: PropTypes.object,
    getValue: PropTypes.func,
    table: PropTypes.object,
}