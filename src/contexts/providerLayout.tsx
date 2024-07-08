"use client";

import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";


interface contextType {
    is_Popup: boolean;
    is_listPopup: boolean,
    is_commentPopup: boolean,
    setShowPopup: () => void;
    setShowListPopup: () => void;
    setShowCommentPopup: () => void;
}

const defaultContext = {
    is_Popup: false,
    is_listPopup: false,
    is_commentPopup: false,
    setShowPopup: () => { },
    setShowListPopup: () => { },
    setShowCommentPopup: () => { }
};

const contextLayout = createContext<contextType>(defaultContext);

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    const [is_Popup, set_Popup] = useState(false)
    const [is_listPopup, set_listPopup] = useState(false)
    const [is_commentPopup, set_conmmentPopup] = useState(false)

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


    return (
        <contextLayout.Provider
            value={{
                is_Popup: is_Popup,
                is_listPopup: is_listPopup,
                is_commentPopup: is_commentPopup,
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
