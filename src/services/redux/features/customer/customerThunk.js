import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from '../../../helper/api';

export const getCustomerData = createAsyncThunk('customer/crud/list', async(_, thunkAPI) => {
    try {
        const url = '/admin/customer/list';
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
        // return thunkAPI.rejectWithValue(error.response?.data || error.message);
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message,
            errors: error.response?.data?.errors || {},
        });
    }
});

export const createCustomerData = createAsyncThunk('customer/crud/create', async(payload, thunkAPI) => {
    try {
        const url = "/admin/customer/create";
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

export const updateCustomerData = createAsyncThunk('customer/crud/update', async(payload, thunkAPI) => {
    try {
        const url = "/admin/customer/update";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                message: data.message || "Failed to update customer",
                errors: data.errors || {},
            });
        }

        return data.data;
        // return res.data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || error.message || "Something went wrong",
            errors: error.response?.data?.errors || {},
        });
    }
});

export const deleteCustomerData = createAsyncThunk('customer/crud/delete', async(payload, thunkAPI) => {
    try {
        const url = "/admin/customer/delete";
        const res = await post(payload, url);
        const data = res.data;

        if(!data.success) {
            return thunkAPI.rejectWithValue({
                message: data.message || "Failed to delete Customer",
                errors: data.errors || {},
            });
        }
        
        return data.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data.message || error.message || "Something went wrong",
            errors: error.response?.data?.errors || {},
        });
    }
});