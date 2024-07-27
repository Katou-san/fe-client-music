"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./_morePlaylist.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { toast } from "react-toastify";
import { playlistType } from "@/model/playlistModel";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    onReload?: () => void;
    playlist: playlistType
    style?: React.CSSProperties
    type?: number
    event?: () => void
};

const MorePlaylistDropDown = ({ drop_Down, set_Drop, playlist, style, type = 0, onReload = () => { }, event = () => { } }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                set_Drop();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);

    const handleDeleteRepost = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            // Repost.Delete(repost.Repost_Id)
            //     .then((res) => {
            //         if (res.status == 200) {
            //             toast.success(res.message)
            //             onReload()
            //             set_Drop();
            //         } else {
            //             toast.warning(res.message)
            //         }
            //     })
        }
    }

    return (
        <div
            className={`dropDownRepost ${drop_Down && "activeDropDownRepost"}`}
            style={style}
            ref={itemRef}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <>
                <ul>
                    <li
                        className={` overflow__Text`}
                        onClick={() => {
                            set_Drop()
                            event()
                        }}
                    >
                        Edit
                    </li>
                    <li
                        className={` ${type == 1 ? "paused" : ""} overflow__Text`}
                        onClick={handleDeleteRepost}
                    >
                        Delete
                    </li>
                </ul> </>}
        </div>
    );
};

export default MorePlaylistDropDown;
