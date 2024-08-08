import { createSlice } from "@reduxjs/toolkit";

// const Localuser = JSON.parse(localStorage.getItem("ContUserData")) || {};

const UserAuthState = {
  isLoggedIn: localStorage.getItem("userAuth") ? true : false,
  user: '',
  errors: [],
};

export const UserAuthSlice = createSlice({
  name: "user",
  initialState: UserAuthState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser,  setErrors } = UserAuthSlice.actions;

export default UserAuthSlice.reducer;
