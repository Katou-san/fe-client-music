import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/hooks/redux/action/authProvider';
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>