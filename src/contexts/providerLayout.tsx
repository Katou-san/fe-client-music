"use client";

import React, {
    createContext,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";


interface contextType {
    is_Popup: boolean;
    is_listPopup: boolean,
    setShowPopup: () => void;
    setShowListPopup: () => void;
}

const defaultContext = {
    is_Popup: false,
    is_listPopup: false,
    setShowPopup: () => { },
    setShowListPopup: () => { }
};

const contextLayout = createContext<contextType>(defaultContext);

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    const [is_Popup, set_Popup] = useState(false)
    const [is_listPopup, set_listPopup] = useState(false)

    const HandelPopup = () => {
        const state_Popup = is_Popup
        set_Popup(!state_Popup)
        if (state_Popup) {
            set_listPopup(false)
        }
    }

    const set_ShowListPopup = () => {
        if (is_listPopup) {
            set_listPopup(false)
        } else {
            set_Popup(true)
            set_listPopup(true)
        }

    }


    return (
        <contextLayout.Provider
            value={{
                is_Popup: is_Popup,
                is_listPopup: is_listPopup,
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
