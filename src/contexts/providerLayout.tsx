"use client";

import { useAds } from "@/contexts/providerAds";
import { useAudio } from "@/contexts/providerAudio";
import { current } from "@reduxjs/toolkit";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";


interface contextType {
    is_Popup: boolean;
    is_listPopup: boolean,
    is_commentPopup: boolean,
    is_albumForm: boolean,
    is_ads: boolean,
    setShowAds: (value: boolean) => void;
    setAlbumForm: (value: boolean) => void;
    setShowPopup: () => void;
    setShowListPopup: () => void;
    setShowCommentPopup: () => void;
}

const defaultContext = {
    is_Popup: false,
    is_listPopup: false,
    is_commentPopup: false,
    is_albumForm: false,
    is_ads: false,
    setShowAds: (value: boolean) => { },
    setAlbumForm: (value: boolean) => { },
    setShowPopup: () => { },
    setShowListPopup: () => { },
    setShowCommentPopup: () => { }
};

const contextLayout = createContext<contextType>(defaultContext);

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    const { show_Ads, set_ShowAds, change_Percent, list_Ads, index_Song, info_Ads, list_Song, onAds, set_OnAds, set_PercentAds } = useAds()
    const { currentIndex, currentList, setList, setIndex } = useAudio()
    const [is_Popup, set_Popup] = useState(false)
    const [is_listPopup, set_listPopup] = useState(false)
    const [is_commentPopup, set_conmmentPopup] = useState(false)
    const [is_AlbumForm, set_AlbumForm] = useState(false)
    const [is_Ads, set_Ads] = useState(false)

    const HandelPopup = () => {
        const state_Popup = is_Popup
        set_Popup(!state_Popup)
        if (state_Popup) {
            set_listPopup(false)
            set_conmmentPopup(false)
        }
    }


    const set_ShowListPopup = () => {
        if (is_listPopup) {
            set_listPopup(false)
        } else {
            set_Popup(true)
            set_listPopup(true)
            set_conmmentPopup(false)
        }
    }

    const set_ShowCommentPopup = () => {
        if (is_commentPopup) {
            set_conmmentPopup(false)
        } else {
            set_Popup(true)
            set_listPopup(false)
            set_conmmentPopup(true)
        }
    }

    useEffect(() => {
        change_Percent(currentIndex, currentList)
    }, [currentIndex])

    useEffect(() => {
        set_PercentAds(0)
    }, [currentList])

    useEffect(() => {
        if (show_Ads) {
            setList(list_Ads)
            setIndex(0)
            set_Ads(true)
        } else {

            if (onAds) {
                set_OnAds()
                set_Ads(false)
                setList(list_Song)
                setIndex(index_Song)
            }
        }
    }, [show_Ads, currentIndex, info_Ads, onAds])

    return (
        <contextLayout.Provider
            value={{
                is_Popup: is_Popup,
                is_listPopup: is_listPopup,
                is_commentPopup: is_commentPopup,
                is_albumForm: is_AlbumForm,
                is_ads: is_Ads,
                setShowAds: (value: boolean) => set_Ads(value),
                setAlbumForm: (value: boolean) => set_AlbumForm(value),
                setShowCommentPopup: set_ShowCommentPopup,
                setShowPopup: HandelPopup,
                setShowListPopup: set_ShowListPopup,
            }}
        >
            {children}
        </contextLayout.Provider>
    );
};

const useLayout = () => {
    return useContext(contextLayout);
};
export { ProviderLayout, contextLayout, useLayout };
