"use client";

import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";


interface contextType {
    re_comment: boolean
    re_reply: boolean
    re_repost: boolean
    re_follow: boolean
    re_profile: boolean
    set_ReComment: () => void
    set_ReReply: () => void
    set_ReRepost: () => void
    set_ReFollow: () => void,
    set_ReProfile: () => void
}

const defaultContext = {
    re_comment: false,
    re_reply: false,
    re_repost: false,
    re_follow: false,
    re_profile: false,
    set_ReComment: () => { },
    set_ReReply: () => { },
    set_ReRepost: () => { },
    set_ReFollow: () => { },
    set_ReProfile: () => { }
};

const contextReload = createContext<contextType>(defaultContext);

const ProviderReload = ({ children }: { children: ReactNode }) => {
    const [reloadComment, set_ReloadComment] = useState(false)
    const [reloadReply, set_ReloadReply] = useState(false)
    const [reloadRepost, set_ReloadRepost] = useState(false)
    const [reloadFollow, set_ReloadFollow] = useState(false)
    const [reloadProfile, set_ReloadProfile] = useState(false)
    return (
        <contextReload.Provider
            value={{
                re_profile: reloadProfile,
                re_comment: reloadComment,
                re_reply: reloadReply,
                re_repost: reloadRepost,
                re_follow: reloadFollow,
                set_ReProfile: () => set_ReloadProfile(pre => !pre),
                set_ReComment: () => set_ReloadComment(pre => !pre),
                set_ReReply: () => set_ReloadReply(pre => !pre),
                set_ReRepost: () => set_ReloadRepost(pre => !pre),
                set_ReFollow: () => set_ReloadFollow(pre => !pre)
            }}
        >
            {children}
        </contextReload.Provider>
    );
};

const useReload = () => {
    return useContext(contextReload);
};
export { ProviderReload, contextReload, useReload };
