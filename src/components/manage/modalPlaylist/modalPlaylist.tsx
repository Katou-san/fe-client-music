"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./_modalPlaylist.scss";
import { Playlist } from "@/apis/Playlist";
import { list_playlistType } from "@/model/playlistModel";
import { Track } from "@/apis/Track";
import { songType } from "@/model/songModel";
import { LoadingSVG, LoadingSVGWatting } from "@/Icons/Loading";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    song: songType
};

const ModalDropdownPlaylist = ({ drop_Down, set_Drop, song }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
    const [list_Playlits, set_list] = useState<list_playlistType>([]);
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

    useEffect(() => {
        set_Loading(true);
        if (drop_Down) {
            Playlist.Get_User_Playlist().then((res) => {
                set_list(res.data)
                set_Loading(false);
            });
        }

    }, [drop_Down]);

    const handleDelete = (Playlist_Id: string) => {
        if (userProvider.Access_Token != "" && userProvider.is_Login) {

            Track.Create({ Playlist_Id, Song_Id: song.Song_Id })
                .then((res) => {
                    if (res.status == 200) {
                        toast.success(res.message);
                    } else {
                        toast.error(res.message);
                    }
                })
            set_Drop()
        } else {
            toast.warning("Cant add song to playlist");
        }
    };

    return (
        <div
            className={`dropDownPlaylist ${drop_Down && "activeDropDownPlaylist"}`}
            ref={itemRef}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading &&
                <ul>
                    <h1>Your playlist</h1>
                    {list_Playlits.map((playlist, index) => (
                        <li
                            className="paused overflow__Text"
                            key={index}
                            onClick={() => handleDelete(playlist.Playlist_Id)}
                        >
                            {playlist?.Playlist_Name}
                        </li>
                    ))}
                </ul>}
        </div>
    );
};

export default ModalDropdownPlaylist;
