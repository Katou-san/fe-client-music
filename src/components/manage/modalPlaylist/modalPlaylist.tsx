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
    style?: React.CSSProperties
};

const ModalDropdownPlaylist = ({ drop_Down, set_Drop, song, style }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
    const [list_Playlits, set_list] = useState<list_playlistType>([]);
    const [list_Album, set_listAlbum] = useState<list_playlistType>([]);

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
            Promise.all([
                Playlist.Get_User_Playlist().then((res) => {
                    if (res.status == 200) {
                        set_list(res.data)
                    }

                }),
                Playlist.Get_User_Album().then((res) => {
                    if (res.status == 200) {
                        set_listAlbum(res.data)
                    }
                })
            ]).then(() => set_Loading(false))

        }

    }, [drop_Down]);

    const handleAddPlaylist = (Playlist_Id: string) => {
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

    const handleAddAlbum = (Playlist_Id: string) => {
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
            style={style}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading &&
                <>
                    <div className="listPlaylist">
                        <h1>Your playlist</h1>
                        <ul>
                            {list_Playlits.map((playlist, index) => (
                                <li
                                    className=" overflow__Text"
                                    key={index}
                                    onClick={() => handleAddPlaylist(playlist.Playlist_Id)}
                                >
                                    {playlist?.Playlist_Name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="listPlaylist">
                        <h1>Your albums</h1>
                        <ul>
                            {list_Album.map((playlist, index) => (
                                <li
                                    className=" overflow__Text"
                                    key={index}
                                    onClick={() => handleAddAlbum(playlist.Playlist_Id)}
                                >
                                    {playlist?.Playlist_Name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            }
        </div>
    );
};

export default ModalDropdownPlaylist;
