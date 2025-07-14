import { UserGroupIcon } from "@heroicons/react/24/outline";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_ADMINISTRATOR = "/administrator";

const joinPath = (root, item) => {
    const rootClean = root.endsWith('/') ? root.slice(0, -1) : root;
    const itemClean = item.startsWith('/') ? item : `/${item}`;
    return `${rootClean}${itemClean}`;
}

export const administrator = {
    id: 'administrator',
    type: NAV_TYPE_ROOT,
    path: ROOT_ADMINISTRATOR,
    title: 'Administrator',
    transKey: 'nav.administrator.administrator',
    Icon: UserGroupIcon,
    childs: [
        {
            id: 'administrator.administrator.administrator',
            path: joinPath(ROOT_ADMINISTRATOR, 'admin'),
            type: NAV_TYPE_ITEM,
            title: 'Administrator',
            transKey: 'nav.administrator.administrator',
            Icon: UserGroupIcon,
        },
        {
            id: 'administrator.administrator.role_navigation',
            path: joinPath(ROOT_ADMINISTRATOR, 'role_has_navigation'),
            type: NAV_TYPE_ITEM,
            title: 'Role Navigation',
            transKey: 'nav.administrator.role_has_navigation',
            Icon: UserGroupIcon,
        }
    ]
}