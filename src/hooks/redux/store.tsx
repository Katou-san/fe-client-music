import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/hooks/redux/action/authProvider';
import infoProvider from '@/hooks/redux/action/infoProvider';
import searchProvider from '@/hooks/redux/action/searchProvider';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoProvider,
        search: searchProvider
    }
})

export type RootState = ReturnType<typeof store.getState>