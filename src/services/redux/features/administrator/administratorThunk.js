import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from '../../../helper/api';

export const getAdministratorData = createAsyncThunk('/admininistration/crud/list', async (_, thunkAPI) => {
    try {
        const url = "/admin/list";
        const res = await get({}, url);
        return res.data.data;
    }
    catch(err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const createAdministratorData = createAsyncThunk('/administration/crud/create', async (data, thunkAPI) => {
    try {
        const url = "/admin/create";
        const res = await post(data, url);
        return res.data.data;
    }
    catch(err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const updateAdministratorData = createAsyncThunk('/administration/crud/update', async (data, thunkAPI) => {
    try {
        const url = "/admin/update";
        const res = await post(data, url);
        return res.data.data;
    }
    catch(err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteAdministratorData = createAsyncThunk('/administration/crud/delete', async (data, thunkAPI) => {
    try {
        const url = "/admin/delete";
        const res = await post(data, url);
        return res.data.data;
    }
    catch(err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
})