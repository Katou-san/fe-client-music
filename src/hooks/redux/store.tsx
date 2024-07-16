import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/hooks/redux/action/authProvider';
import infoProvider from '@/hooks/redux/action/infoProvider';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoProvider
    }
})

export type RootState = ReturnType<typeof store.getState>