'use client'

import { Ads } from '@/apis/Ads';
import { Send } from '@/apis/Send';
import { EnvConfig } from '@/configs/envConfig';
import { useAudio } from '@/contexts/providerAudio';
import { adsModel, adsType } from '@/model/adsModel';
import { list_songType, SongModel, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type contextType = {}
const defaultContext = {}

const contextAds = createContext<contextType>(defaultContext);
const ProviderAds = ({ children }: { children: ReactNode }) => {
    const { currentList, currentIndex, setList, setIndex } = useAudio()
    const [CurrentPlaylist, set_CurrentPlaylist] = useState<list_songType>([])
    const [currentIndexSong, set_CurrentIndexSong] = useState(0)
    const [infoAds, set_InfoAds] = useState<adsType>(adsModel.init)
    const [randomAds, set_RandomAds] = useState(false)
    const [percentAds, set_PercentAds] = useState(0)

    useEffect(() => {
        set_PercentAds(percentAds + 10)
        const percentTemp = percentAds + 10
        if (percentTemp >= 100 && percentTemp <= 110) {
            set_RandomAds(true)
            set_CurrentPlaylist(currentList)
            set_CurrentIndexSong(currentIndex)
            Ads.Get_Random().then((res) => {
                if (res.status == 200) {
                    set_InfoAds(res.data)
                }
            })
        } else if (percentTemp > 120) {
            set_PercentAds(0)
        }

    }, [currentIndex, currentList])

    useEffect(() => {
        if (randomAds) {
            setList([ConvertAdsToSong()])
            setIndex(0)
        }

    }, [infoAds, currentIndex])


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
        <contextAds.Provider value={''}>
            {children}
        </contextAds.Provider>
    );
}

const useAds = () => {
    return useContext(contextAds)
}

export { ProviderAds, useAds };
