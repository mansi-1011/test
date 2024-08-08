import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const toastState = {
    toast: {
        message: '',
        type: '',
        show: false
    }
}

export const toastSlice = createSlice({
    name: "toast",
    initialState: toastState,
    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload
            toast[action.payload.type](action.payload.message)
        },
        clearToast: (state, action) => {
            state.toast = toastState.toast
        },
    }
})

export const { setToast, clearToast } = toastSlice.actions

export default toastSlice.reducer