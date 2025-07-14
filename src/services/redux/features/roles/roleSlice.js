import { createSlice } from "@reduxjs/toolkit";
import { getRolesData, createRolesData, updateRolesData } from "./roleThunk";


const initialState = {
    loading: false,
    error: null,
    data: [],
}

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRolesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRolesData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRolesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch items";
            })

            //create
            .addCase(createRolesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRolesData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
            })
            .addCase(createRolesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create items';
            })

            //update
            .addCase(updateRolesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRolesData.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.id == action.payload.id);
                if(index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateRolesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update role";
            })
    }
});

export const { clearCrudError } = rolesSlice.actions;
export default rolesSlice.reducer;