import { createAsyncThunk } from "@reduxjs/toolkit";
import { post, get } from '../../../helper/api';

export const getNavigationData = createAsyncThunk('navigation/crud/list', async (_, thunkAPI) => {
    try {
        const url = "/admin/navigation/list";
        const res = await get({}, url);

        return res.data.data;
    }
    catch(error) {
         console.error("[DEBUG] NavigationThunk ERROR:", {
            message: error.message,
            response: error.response,
            stack: error.stack,
        });

        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

export const createNavigationData = createAsyncThunk('navigation/crud/create', async (payload, thunkAPI) => {
    try {
        const url = "/admin/navigation/create";
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

export const updateNavigationData = createAsyncThunk('navigation/crud/update', async (payload, thunkAPI) => {
    try {
        const url = "/admin/navigation/update";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            thunkAPI.rejectWithValue({
                message: data.message || "Failed to Update Navigation",
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

export const deleteNavigationData = createAsyncThunk('navigation/crud/delete', async (payload, thunkAPI) => {
    try {
        const url = "/admin/navigation/delete";
        const res = await post(data, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                message: data.message || "Failed to delete Navigation",
                errors: data.errors || {},
            })
        }
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data.message || error.message || "Something went wrong",
            errors: error.response?.data?.errors || {},
        });
    }
})