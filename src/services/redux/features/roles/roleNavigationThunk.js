import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "services/helper/api";

export const getRoleNavigationData = createAsyncThunk('/roles/navigation/crud/list', async (_, thunkAPI) => {
    try {
        const url = "/admin/role_has_navigations/list";
        const res = await get({}, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                message: data.message,
                errors: data.errors || {},
            });
        }

        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message,
            errors: error.response?.data?.errors || {},
        })
    }
});

export const createRoleNavigationData = createAsyncThunk('/roles/navigation/crud/create', async (payload, thunkAPI) => {
    try {
        const url = "/admin/role_has_navigation/create";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                mesasage: data.message,
                errors: data.errors || {},
            });
        }

        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message,
            errors: error.response?.data?.errors || {},
        });
    }
});

export const updateRoleNavigationData = createAsyncThunk('/roles/navigation/crud/update', async (payload, thunkAPI) => {
    try {
        const url = "/admin/role_has_navigation/create";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                messages: data.message,
                errors: data.errors || {},
            });
        }

        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
           message: error.response?.data?.message || error.message,
           errors: error.response?.data?.errors || {},
        });
    }
})