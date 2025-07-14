import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "services/helper/api";


export const getRolesData = createAsyncThunk('roles/crud/list', async (_, thunkAPI) => {
    try {
        const url = "/admin/roles/list";
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

export const createRolesData = createAsyncThunk('roles/crud/create', async(payload, thunkAPI) => {
    console.log("[THUNK] createRolesData called with", payload); // ✅ LOG
    try {
        const url = "/admin/roles/create";
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

export const updateRolesData = createAsyncThunk('roles/crud/update', async(payload, thunkAPI) => {
    try {
        const url = "/admin/roles/update";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                message: data.message || "Failed to delete Roles",
                errors: data.errors || {},
            })
        }

        return res.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data.message || error.message || "Something went wrong",
            errors: error.response?.data.errors || {},
        });
    }
})