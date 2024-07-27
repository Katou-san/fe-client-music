'use client'
import { auth } from '@/apis/Auth';
import { Playlist } from '@/apis/Playlist';
import { Visit } from '@/apis/Visit';
import { EnvConfig } from '@/configs/envConfig';
import { loginProvider } from '@/hooks/redux/action/authProvider';
import { setInfoProvider } from '@/hooks/redux/action/infoProvider';
import { RootState } from '@/hooks/redux/store';
import { list_playlistType } from '@/model/playlistModel';
import React, { createContext, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type contextType = {}
const defaultContext = {}

const contextAuth = createContext<contextType>(defaultContext);
const ProviderAuth = ({ children }: { children: ReactNode }) => {
    const dispacth = useDispatch()
    const userProvider = useSelector((state: RootState) => state.auth)
    const infoProvider = useSelector((state: RootState) => state.info)
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
            const session = sessionStorage.getItem('visit')
            if (session == undefined) {
                sessionStorage.setItem('visit', 'active')
                Visit.Get()
            }
        }
    }, [])

    useEffect(() => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            let infoTemp = { Like: "", Upload: "" }
            Playlist.Get_Default().then((res) => {
                if (res.status === 200) {
                    const list_Playlist = res.data as list_playlistType
                    list_Playlist.map((playlist) => {
                        if (playlist.Playlist_Name == 'like' && playlist.Type == 0) {
                            infoTemp.Like = playlist.Playlist_Id
                        }
                        if (playlist.Playlist_Name == 'upload' && playlist.Type == 0) {
                            infoTemp.Upload = playlist.Playlist_Id
                        }
                    })
                    dispacth(setInfoProvider(infoTemp))
                }
            })

        }
    }, [userProvider])


    return (
        <contextAuth.Provider value={''}>
            {children}
        </contextAuth.Provider>
    );
}

export default ProviderAuth;
