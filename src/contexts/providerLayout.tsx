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
    setShowPopup: () => void;
}

const defaultContext = {
    is_Popup: false,
    setShowPopup: () => { }

};

const contextLayout = createContext<contextType>(defaultContext);

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    const [is_Popup, set_Popup] = useState(false)

    const HandelPopup = () => {
        set_Popup(prev => !prev)
    }
    return (
        <contextLayout.Provider
            value={{
                is_Popup: is_Popup,
                setShowPopup: HandelPopup
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
