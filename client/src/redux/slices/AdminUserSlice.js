import { createSlice } from "@reduxjs/toolkit";

const AdminUserState = {
    isLoggedIn: localStorage.getItem('user') ? true : false,
    user: {},
    errors: [],
};

export const AdminUserSlice = createSlice({
    name: "user",
    initialState: AdminUserState,
    reducers: {
        AdminsetIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        AdminsetUser: (state, action) => {
            state.user = action.payload;
        },
        AdminsetErrors: (state, action) => {
            state.errors = action.payload;
        },
    }
});

export const { AdminsetIsLoggedIn, AdminsetUser, AdminsetErrors } = AdminUserSlice.actions;

export default AdminUserSlice.reducer;