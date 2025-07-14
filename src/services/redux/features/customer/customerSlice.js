import { createSlice } from "@reduxjs/toolkit";
import { getCustomerData, createCustomerData, updateCustomerData, deleteCustomerData } from "./customerThunk";

const initialState = {
    loading: false,
    error: null,
    data: [],
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCustomerData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch Customer";
            })

            //create
            .addCase(createCustomerData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCustomerData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
            })
            .addCase(createCustomerData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create Customer';
            })

            //update
            .addCase(updateCustomerData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomerData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id == action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateCustomerData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update Customer";
            })

            //delete
            .addCase(deleteCustomerData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCustomerData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id == action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteCustomerData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete customer";
            });
    }
})

export const { clearCrudError } = customerSlice.actions;
export default customerSlice.reducer;