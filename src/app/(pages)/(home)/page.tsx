"use client";
import SliderCard from "@/components/home/Slider_Card/slider";
import React, { useEffect, useState } from "react";
import "./_home.scss";
import ListSong from "@/components/home/Songs/ListSong";
import ListPlaylist from "@/components/home/Playlists/listPlaylist";
import ListArtist from "@/components/home/Artists/listArtist";
import { list_songType } from "@/model/songModel";
import { Propose } from "@/apis/Trending";
import { list_playlistType } from "@/model/playlistModel";
import { list_userType } from "@/model/userModel";
import { LoadingSVGWatting } from "@/Icons/Loading";

export default function Page() {
  const [is_loading, set_Loading] = useState(false);
  const [silder, set_Slider] = useState<list_songType>([]);
  const [listSong, set_ListSong] = useState<list_songType>([]);
  const [listPlaylist, set_ListPlaylist] = useState<list_playlistType>([]);
  const [listArtist, set_ListArtist] = useState<list_userType>([]);

  useEffect(() => {
    if (silder.length == 0) {
      set_Loading(true);
      Promise.all([
        Propose.Get_Silder().then((res) => {
          set_Slider(res.data as list_songType);
        }),
        Propose.Get_Playlist().then((res) =>
          set_ListPlaylist(res.data as list_playlistType)
        ),
        Propose.Get_Song().then((res) =>
          set_ListSong(res.data as list_songType)
        ),
      ]).then((res) => set_Loading(false));
    }
  }, []);

  return (
    <div className="ContentHomePage">
      {is_loading && <div className='loading min-h-80'>
        <LoadingSVGWatting w={100} />
      </div>}
      {!is_loading && <>
        <div className="slider">
          <SliderCard arraySilder={silder} />
        </div>
        <div className="listSong">
          <ListSong arraySong={listSong} />
        </div>
        <div className="listPlaylist">
          <ListPlaylist arrayPlaylist={listPlaylist} />
        </div>
        <div className="listPlaylist">
          <ListPlaylist arrayPlaylist={listPlaylist} />
        </div>
        <div className="listArtist">
          <ListArtist />
        </div></>}
    </div>
  );
}
