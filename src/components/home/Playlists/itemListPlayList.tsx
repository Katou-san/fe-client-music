"use client";
import { Send } from "@/apis/Send";
import { Track } from "@/apis/Track";
import { useAudio } from "@/contexts/providerAudio";
import { PauseIcon, PlayIcon } from "@/Icons/icon_v1";
import { playlistType } from "@/model/playlistModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Prop = {
  active: boolean;
  item: playlistType;
  index: number;
};
const ItemListPlayList = ({ active, item, index }: Prop) => {
  const routes = useRouter();
  const {
    setList,
    setIndex,
    info_Playlist,
    Set_InfoPlaylist,
    is_Playing,
    setPlay,
  } = useAudio();
  const [url, set_url] = useState("");
  useEffect(() => {
    if (URLValidate.isUrl(item.Image)) {
      Send.Image_P(item.Image).then((res) => set_url(URL.createObjectURL(res)));
    } else {
      set_url(item.Image);
    }
  }, [item]);

  const handleClick = () => {
    if (info_Playlist?.Playlist_Id != item.Playlist_Id) {
      Track.Get_Track(item.Playlist_Id).then((res) => {
        if (res.status === 200) {
          Set_InfoPlaylist(item);
          setList(res.data);
          setIndex(0);
        }
      });
    } else {
      setPlay();
    }
  };

  const handleRoutes = () => {
    routes.push(`/playlist?id=${item.Playlist_Id}`);
  };

  return (
    <div
      className={`itemListPlaylist ${
        info_Playlist?.Playlist_Id == item.Playlist_Id
          ? "itemActive"
          : "itemNotActive"
      }`}
    >
      <Image alt="" src={url} width={10000} height={10000} />
      <div className="contentItemPlaylist" onClick={handleRoutes}>
        <h1 className="overflow__Text">{item.Playlist_Name}</h1>
        <h3 className="overflow__Text">by {item.Artist}</h3>
      </div>
      <div className="frameBtnListPlaylist" onClick={handleClick}>
        <div className="frameIcon">
          {is_Playing && info_Playlist?.Playlist_Id == item.Playlist_Id ? (
            <PauseIcon color="#383838" w={27} />
          ) : (
            <PlayIcon color="#383838" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemListPlayList;
