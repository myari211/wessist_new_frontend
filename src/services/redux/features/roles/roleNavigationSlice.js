import { createSlice } from "@reduxjs/toolkit";
import { getRoleNavigationData, createRoleNavigationData, updateRoleNavigationData } from "./roleNavigationThunk";

const initialState = {
    loading: false,
    error: null,
    data: [],
}

const roleNavigationData = createSlice({
    name: 'role_has_navigation',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoleNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoleNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRoleNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create Role Navigation";
            })
            
            //create
            .addCase(createRoleNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoleNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload)
            })
            .addCase(createRoleNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create Role Navigation'
            })
            
            .addCase(updateRoleNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoleNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id === action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateRoleNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update role";
            })
    }
});

export const { clearCrudError } = roleNavigationData.actions;
export default roleNavigationData.reducer;