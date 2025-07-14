import { createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from "services/helper/api";

export const getPermissionData = createAsyncThunk('permission/crud/list', async(_, thunkAPI) => {
    try {
        const url = "/admin/permission/list";
        const res = await get({}, url);

        return res.data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message,
            errors: error.response?.data?.errors || {},
        });
    }
});

export const createPermissionData = createAsyncThunk('permission/crud/create', async (payload, thunkAPI) => {
    try {
        const url = "/admin/permission/create";
        const res = await post(payload, url);
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
        });
    }
});

export const updatePermissionData = createAsyncThunk('permission/crud/update', async (payload, thunkAPI) => {
    try {
        const url = "/admin/permission/update";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            thunkAPI.rejectWithValue({
                message: data.message || "Failed to Update Permission",
                errors: data.errors || {},
            });
        }

        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message || "Something went wrong",
            errors: error.response?.data?.errors || {},
        });
    }
});

export const deletePermissionData = createAsyncThunk('permission/crud/delete', async (payload, thunkAPI) => {
    try {
        const url = "/admin/permission/delete";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            thunkAPI.rejectWithValue({
                message: data.message || "Failed to delete Permission",
                errors: data.errors || {},
            });
        }

        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message || "Something went wrong",
            errors: error.response?.data?.errors || {},
        });
    }
})