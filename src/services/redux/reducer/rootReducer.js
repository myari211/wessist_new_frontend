import { combineReducers } from "@reduxjs/toolkit";
import navigationReducer from '../features/navigation/navigationSlice';
import rolesReducer from '../features/roles/roleSlice';
import administratorReducer from '../features/administrator/administratorSlice';
import customerReducer from '../features/customer/customerSlice';
import roleNavigationReducer from '../features/roles/roleNavigationSlice';
import permissionReducer from '../features/permission/permissionSlice';

const rootReducer = combineReducers({
    navigation: navigationReducer,
    roles: rolesReducer,
    roleNavigation: roleNavigationReducer,
    administrator: administratorReducer,
    customer: customerReducer,
    permission: permissionReducer,
});

export default rootReducer;