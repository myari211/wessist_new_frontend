import { TableCellsIcon, UsersIcon } from '@heroicons/react/24/outline';
import DashboardsIcon from 'assets/dualicons/prototypes.svg?react'
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'



const ROOT_MASTER_DATA = '/master_data'

// const joinPath = (root, item) => `${root}${item}`;
const joinPath = (root, item) => {
    const rootClean = root.endsWith('/') ? root.slice(0, -1) : root;
    const itemClean = item.startsWith('/') ? item : `/${item}`;
    return `${rootClean}${itemClean}`
}

export const master_data = {
    id: 'master_data',
    type: NAV_TYPE_ROOT,
    path: ROOT_MASTER_DATA,
    title: 'Master Data',
    transKey: 'nav.master_data.master_data',
    Icon: DashboardsIcon,
    childs: [
        {
            id: 'master_data.navigation',
            path: joinPath(ROOT_MASTER_DATA, 'navigation'),
            type: NAV_TYPE_ITEM,
            title: 'Navigation',
            transKey: 'nav.master_data.navigation',
            Icon: TableCellsIcon,
        },
        {
            id: 'master_data.roles',
            path: joinPath(ROOT_MASTER_DATA, 'roles'),
            type: NAV_TYPE_ITEM,
            title: 'Roles',
            transKey: 'nav.master_data.roles',
            Icon: UsersIcon
        },
        {
            id: 'master_data.permissions',
            path: joinPath(ROOT_MASTER_DATA, 'permissions'),
            type: NAV_TYPE_ITEM,
            title: 'Permissions',
            transKey: 'nav.master_data.permissions',
            Icon: UsersIcon,
        },
        {
            id: 'master_data.customer',
            path: joinPath(ROOT_MASTER_DATA, 'customer'),
            type: NAV_TYPE_ITEM,
            title: 'Customer',
            transKey: 'nav.master_data.customer',
            Icon: UsersIcon,
        }
    ]
}
