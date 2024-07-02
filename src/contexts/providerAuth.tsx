'use client'
import { auth } from '@/apis/Auth';
import { EnvConfig } from '@/configs/envConfig';
import { loginProvider } from '@/hooks/redux/action/authProvider';
import React, { createContext, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type contextType = {}
const defaultContext = {}

const contextAuth = createContext<contextType>(defaultContext);
const ProviderAuth = ({ children }: { children: ReactNode }) => {
    const dispacth = useDispatch()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(EnvConfig.LocalToken) ?? undefined
            if (token !== undefined) {
                auth.Auth()
                    .then((res) => {
                        if (res.status === 200) {
                            dispacth(loginProvider(res.data))
                            localStorage.setItem(EnvConfig.LocalToken, res.data.Access_Token)
                        }
                    })
            }
        }
    }, [])
    return (
        <contextAuth.Provider value={''}>
            {children}
        </contextAuth.Provider>
    );
}

export default ProviderAuth;
