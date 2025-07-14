import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Highlight } from "components/shared/Highlight";
import { Button } from "components/ui";

import PropTypes from "prop-types";
import clsx from "clsx";
import { ensureString } from "utils/ensureString";

export function IdCell({ row, getValue, table }) {
    const query = ensureString(table.getState().globalFilter);

    return(
        <div className="-mx-2 flex items-center space-x-2">
            {row.getCanExpand() ? (
                <Button
                    isIcon
                    className="size-5"
                    variant="flat"
                    onClick={row.getToggleExpandedHandler()}
                >
                    <ChevronUpIcon
                        className={clsx(
                            "size-4 transition-transform",
                            row.getIsExpanded() && "rotate-180"
                        )}
                    />
                </Button>
            ) : null}
            <span>
                <Highlight query={query}>{getValue()}</Highlight>
            </span>
        </div>
    )
}

IdCell.propTypes = {
    row: PropTypes.object,
    table: PropTypes.object,
    getValue: PropTypes.func,
}