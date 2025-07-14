import { createSlice } from "@reduxjs/toolkit";
import { getAdministratorData, createAdministratorData, updateAdministratorData, deleteAdministratorData } from "./administratorThunk";

const initialState = {
    loading: false,
    error: null,
    data: [],
}

const administrationSlice = createSlice({
    name: 'administrator',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdministratorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdministratorData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAdministratorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch admin";
            })

            //create
            .addCase(createAdministratorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAdministratorData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
            })
            .addCase(createAdministratorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create admin';
            })

            //update
            .addCase(updateAdministratorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdministratorData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id == action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateAdministratorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update admin';
            })

            //delete
            .addCase(deleteAdministratorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdministratorData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id == action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteAdministratorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete admin";
            })
    }
});


export const { clearCrudError } = administrationSlice.actions;
export default administrationSlice.reducer;
