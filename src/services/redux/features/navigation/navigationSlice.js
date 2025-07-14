import { createSlice } from "@reduxjs/toolkit";
import { getNavigationData, createNavigationData, updateNavigationData, deleteNavigationData } from "./navigationThunk";

const initialState = {
    loading: false,
    error: null,
    data: {
        all: [],
        master: [],
    },
}

const crudSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch items";
            })

            //create
            .addCase(createNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.all.unshift(action.payload.navigation);
            })
            .addCase(createNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create item';
            })

            //update
            .addCase(updateNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.all.findIndex(item => item.id == action.payload.navigation.id);
                if(index !== -1) {
                    state.data.all[index] = action.payload.navigation;
                }
            })
            .addCase(updateNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update item';
            })

            //delete
            .addCase(deleteNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.all.findIndex(item => item.id == action.payload.navigation.id);
                if(index !== -1) {
                    state.data.all[index] = action.payload.navigation;
                }
            })
            .addCase(deleteNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete item';
            })
    }
});

export const { clearCrudError } = crudSlice.actions;
export default crudSlice.reducer;