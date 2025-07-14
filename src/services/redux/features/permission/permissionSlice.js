import { createSlice } from "@reduxjs/toolkit";
import { getPermissionData, createPermissionData, updatePermissionData, deletePermissionData } from "./permissionThunk";

const initialState = {
    loading: false,
    error: null,
    data: [],
}

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        clearCrudError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPermissionData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPermissionData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPermissionData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to Fetch Permission";
            })

            //create
            .addCase(createPermissionData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPermissionData.fulfilled, (state, action) => {
                state.loading = false;
                const { category, ...newPermission } = action.payload;

                const existingCategory = state.data.find(item => item.category === category);
                if(existingCategory) {
                    existingCategory.permission.unshift(newPermission);
                }
                else {
                    state.data.unshift({
                        category,
                        permission: [newPermission]
                    });
                }
            })
            .addCase(createPermissionData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create Permission';
            })

            //update
            .addCase(updatePermissionData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePermissionData.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;

                let oldGroupIndex = -1;
                let oldPermissionIndex = -1;
                let oldCategory = null;

                state.data.forEach((group, groupIndex) => {
                    const index = group.permission.findIndex(p => p.id === updated.id);
                    if(index !== -1) {
                        oldGroupIndex = groupIndex;
                        oldPermissionIndex = index;
                        oldCategory = group.category;
                    }
                });

                if(oldCategory === updated.category) {
                    state.data[oldGroupIndex].permission[oldPermissionIndex] = updated;
                }
                else {
                    state.data[oldGroupIndex].permission.splice(oldPermissionIndex, 1);

                    if(state.data[oldGroupIndex].permission.length === 0) {
                        state.data.splice(oldGroupIndex, 1);
                    }

                    const newGroup = state.data.find(group => group.category === updated.category);
                    if(newGroup) {
                        newGroup.permission.unshift(updated);
                    }
                    else {
                        state.data.unshift({
                            category: updated.category,
                            permission: [updated],
                        })
                    }
                }
            })
            .addCase(updatePermissionData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to Update Permission';
            })

            //delete
            .addCase(deletePermissionData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePermissionData.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;

                state.data.forEach(group => {
                    group.permission = group.permission.filter(p => p.id != deletedId);
                });

                state.data = state.data.filter(group => group.permission.length > 0);
            })
            .addCase(deletePermissionData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete Permission";
            });
    }
});

export const { clearCrudError } = permissionSlice.actions;
export default permissionSlice.reducer;