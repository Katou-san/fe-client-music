'use client'

import { Ads } from '@/apis/Ads';
import { Send } from '@/apis/Send';
import { EnvConfig } from '@/configs/envConfig';
import { useAudio } from '@/contexts/providerAudio';
import { useLayout } from '@/contexts/providerLayout';
import { adsModel, adsType } from '@/model/adsModel';
import { list_songType, SongModel, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type contextType = {
    show_Ads: boolean
    list_Song: list_songType
    index_Song: number
    info_Ads: adsType
    set_ShowAds: () => void
    handle_EndAds: () => void
    change_Percent: (index: number, list: list_songType) => void
}
const defaultContext = {
    show_Ads: false,
    list_Song: [],
    index_Song: 0,
    info_Ads: adsModel.init,
    set_ShowAds: () => { },
    handle_EndAds: () => { },
    change_Percent: (index: number, list: list_songType) => { }
}

const contextAds = createContext<contextType>(defaultContext);
const ProviderAds = ({ children }: { children: ReactNode }) => {
    const { setShowAds, is_ads } = useLayout()
    const { currentList, currentIndex, setList, setIndex } = useAudio()
    const [CurrentPlaylist, set_CurrentPlaylist] = useState<list_songType>([])
    const [currentIndexSong, set_CurrentIndexSong] = useState(0)
    const [infoAds, set_InfoAds] = useState<adsType>(adsModel.init)
    const [randomAds, set_RandomAds] = useState(false)
    const [percentAds, set_PercentAds] = useState(0)



    useEffect(() => {
        if (percentAds == 10) {
            set_RandomAds(true)
            Ads.Get_Random().then((res) => {
                if (res.status == 200) {
                    set_InfoAds(res.data)
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
        if (percentAds == 10) {
            set_CurrentPlaylist(list)
            set_CurrentIndexSong(index)
        }
        set_PercentAds(percentTemp)
    }

    useEffect(() => {
        if (randomAds) {
            setList([ConvertAdsToSong()])
            setIndex(0)
            setShowAds(true)
        }
    }, [infoAds])
    const handleEndAds = () => {
        setList(CurrentPlaylist)
        setIndex(currentIndexSong)
    }


    const ConvertAdsToSong = () => {
        return {
            Song_Id: infoAds.Ads_Id,
            Song_Name: infoAds.Ads_Name,
            Song_Image: `${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_IMAGE_A}/${infoAds.Ads_Image}`,
            Song_Audio: `${EnvConfig.NEXT_PUBLIC_SEND}${EnvConfig.NEXT_PUBLIC_GET_AUDIO_A}/${infoAds.Ads_Audio}`,
            Artist_Name: "AD",
            Artist: "AD",
            Like: "",
            User_Id: "",
            Category_Id: "",
            Lyrics: infoAds.Content,
            Tag: "",
            Color: "",
            is_Publish: "",
            Create_Date: "",
        }
    }



    return (
        <contextAds.Provider value={
            {
                show_Ads: randomAds,
                list_Song: CurrentPlaylist,
                index_Song: currentIndexSong,
                info_Ads: infoAds,
                set_ShowAds: () => set_RandomAds(pre => !pre),
                handle_EndAds: handleEndAds,
                change_Percent: (index: number, list: list_songType) => handlePecent(index, list)

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
