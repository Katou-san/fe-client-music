'use client'

import { Ads } from '@/apis/Ads';
import { Bill } from '@/apis/Bill';
import { EnvConfig } from '@/configs/envConfig';
import { useLayout } from '@/contexts/providerLayout';
import { adsModel, adsType } from '@/model/adsModel';
import { list_songType, SongModel, songType } from '@/model/songModel';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type contextType = {
    show_Ads: boolean
    list_Song: list_songType
    index_Song: number
    info_Ads: adsType,
    list_Ads: list_songType
    onAds: boolean,
    set_PercentAds: (value: number) => void
    set_OnAds: () => void,
    set_ShowAds: () => void
    handle_EndAds: () => void
    set_NextList: (value: list_songType) => void
    set_NextSongIndex: (value: number) => void
    change_Percent: (index: number, list: list_songType) => void
}
const defaultContext = {
    show_Ads: false,
    list_Song: [],
    list_Ads: [],
    index_Song: 0,
    info_Ads: adsModel.init,
    onAds: false,
    set_PercentAds: (value: number) => { },
    set_OnAds: () => { },
    set_ShowAds: () => { },
    handle_EndAds: () => { },
    change_Percent: (index: number, list: list_songType) => { },
    set_NextList: (value: list_songType) => { },
    set_NextSongIndex: (value: number) => { }
}

const contextAds = createContext<contextType>(defaultContext);
const ProviderAds = ({ children }: { children: ReactNode }) => {
    const { setShowAds, is_ads } = useLayout()
    const [CurrentPlaylist, set_CurrentPlaylist] = useState<list_songType>([])
    const [currentIndexSong, set_CurrentIndexSong] = useState(0)
    const [infoAds, set_InfoAds] = useState<adsType>(adsModel.init)
    const [randomAds, set_RandomAds] = useState(false)
    const [percentAds, set_PercentAds] = useState(0)
    const [onAds, set_OnAds] = useState(false)



    useEffect(() => {
        if (percentAds == 10) {
            Bill.Check_Bill().then((res) => {
                if (res.status == 200) {
                    if (res.data.Bill) {
                        set_PercentAds(0)
                    } else {
                        set_RandomAds(true)
                        set_OnAds(true)
                        Ads.Get_Random().then((res) => {
                            if (res.status == 200) {
                                set_InfoAds(res.data)
                            }
                        })
                    }
                }
            })

        } else if (percentAds > 10) {
            set_PercentAds(0)
        } else {
            set_PercentAds(percentAds)
        }
    }, [percentAds])

    const handlePecent = (index: number, list: list_songType) => {
        const percentTemp = percentAds + 1
        if (!randomAds) {
            set_CurrentPlaylist(list)
            set_CurrentIndexSong(index)
        }
        set_PercentAds(percentTemp)
    }
    const handleEndAds = () => {
        setShowAds(false)
    }




    const ConvertAdsToSong = () => {
        return {
            _id: "",
            Song_Id: infoAds.Ads_Id,
            Song_Name: infoAds.Ads_Name,
            Song_Image: `${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE_A}/${infoAds.Ads_Image}`,
            Song_Audio: `${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_AUDIO_A}/${infoAds.Ads_Audio}`,
            Artist_Name: "AD",
            Artist: "AD",
            Like: 0,
            User_Id: "",
            Category_Id: "",
            Lyrics: infoAds.Content,
            Tag: "",
            Color: "",
            is_Publish: false,
            Create_Date: "",

        }
    }



    return (
        <contextAds.Provider value={
            {
                show_Ads: randomAds,
                list_Song: CurrentPlaylist,
                list_Ads: [ConvertAdsToSong()],
                index_Song: currentIndexSong,
                info_Ads: infoAds,
                onAds: onAds,
                set_PercentAds: (value: number) => set_PercentAds(value),
                set_OnAds: () => set_OnAds(pre => !pre),
                set_ShowAds: () => set_RandomAds(pre => !pre),
                handle_EndAds: handleEndAds,
                change_Percent: (index: number, list: list_songType) => handlePecent(index, list),
                set_NextList: (value: list_songType) => set_CurrentPlaylist(value),
                set_NextSongIndex: (value: number) => set_CurrentIndexSong(value)
            }
        }>
            {children}
        </contextAds.Provider>
    );
}

const useAds = () => {
    return useContext(contextAds)
}

export { ProviderAds, useAds };
