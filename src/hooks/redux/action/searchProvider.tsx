import { EnvConfig } from "@/configs/envConfig";
import { authModel, authResType } from "@/model/authModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        removeSearchProvider: () => '',
        setSearchProvider: (state, action: PayloadAction<string>) => {
            return state = action.payload
        },
    },
});

export const { setSearchProvider, removeSearchProvider } = searchSlice.actions
export default searchSlice.reducer