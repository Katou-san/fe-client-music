
import { info_userType, userModel } from "@/model/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const infoSlice = createSlice({
    name: "info",
    initialState: userModel.init_info,
    reducers: {
        removeInfoProvider: () => userModel.init_info,
        setInfoProvider: (state, action: PayloadAction<info_userType>) => {
            return state = action.payload
        },
    },
});

export const { setInfoProvider, removeInfoProvider } = infoSlice.actions
export default infoSlice.reducer