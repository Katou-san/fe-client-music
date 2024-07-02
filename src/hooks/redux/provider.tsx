'use client'
import { store } from './store'
import { ReactNode, useEffect } from "react";
import { Provider } from 'react-redux'

export const ProviderStore = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
} 