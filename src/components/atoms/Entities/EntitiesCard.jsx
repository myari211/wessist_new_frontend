import PropTypes from "prop-types";
import {
    ArrowUpRightIcon,
    UserIcon,
    BuildingOfficeIcon
} from "@heroicons/react/24/outline";

import { Avatar, Button, Card } from "components/ui";

export function EntitiesCard ({name, avatar, address, admin, branch}) {
    return(
        <Card className="group relative p-5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 hover:shadow-md transition-shadow">
        {/* Header */}
            <div className="flex items-center gap-4">
                <Avatar size={12} name={name} src={avatar} initialColor="auto" />
                <div className="min-w-0">
                    <h3 className="font-semibold truncate text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{address}</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-4 border-gray-200 dark:border-dark-400" />

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full">
                        <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{admin}</span>
                    <span className="text-gray-500 dark:text-gray-400">Users</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full">
                        <BuildingOfficeIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{branch}</span>
                    <span className="text-gray-500 dark:text-gray-400">Branches</span>
                </div>
            </div>

            {/* Action */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
                <Button
                    isIcon
                    size="sm"
                    variant="soft"
                    className="rounded-full bg-gray-100 dark:bg-dark-500 hover:bg-gray-200 dark:hover:bg-dark-400"
                >
                    <ArrowUpRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </Button>
            </div>
        </Card>
    )
}

EntitiesCard.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    address: PropTypes.string,
    admin: PropTypes.number,
    branch: PropTypes.string,
}