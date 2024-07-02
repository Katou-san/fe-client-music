import { authModel, authResType } from "@/model/authModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: authModel.authRes,
    reducers: {
        logoutProvider: () => authModel.authRes,
        loginProvider: (state, action: PayloadAction<authResType>) => {
            return state = action.payload
        },
        signupProvider: (state, action: PayloadAction<authResType>) => {
            return state = action.payload
        },
    },
});

export const { loginProvider, logoutProvider, signupProvider } = authSlice.actions
export default authSlice.reducer