"use client";
import { Playlist } from "@/apis/Playlist";
import { Send } from "@/apis/Send";
import { Track } from "@/apis/Track";
import { useAds } from "@/contexts/providerAds";
import { useAudio } from "@/contexts/providerAudio";
import { useReload } from "@/contexts/providerReload";
import { RootState } from "@/hooks/redux/store";
import { PauseIcon, PlayIcon } from "@/Icons/icon_v1";
import { playlistType } from "@/model/playlistModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type Prop = {
  active: boolean;
  item: playlistType;
  index: number;
  showInfo: boolean;
};
const ItemListPlayList = ({ active, item, index, showInfo }: Prop) => {
  const routes = useRouter();
  const userProvider = useSelector((state: RootState) => state.auth)
  const { set_RePlaylist } = useReload()
  const { onAds, set_NextList, set_NextSongIndex, set_PercentAds } = useAds()
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
  }, [item.Image]);

  const handleClick = () => {
    if (info_Playlist?.Playlist_Id != item.Playlist_Id) {
      Track.Get_Track(item.Playlist_Id).then((res) => {
        if (res.status === 200) {
          if (onAds) {
            set_NextList(res.data)
            set_NextSongIndex(0)
          } else {
            Set_InfoPlaylist(item);
            setList(res.data);
            setIndex(0);
            set_PercentAds(0)
          }
        }
      });
    } else {
      setPlay();
    }
  };

  const handleDelete = () => {
    if (userProvider.Access_Token != '' && userProvider.is_Login) {
      if (item?.Playlist_Id && userProvider.User_Id == item?.User_Id) {
        Playlist.Delete(item.Playlist_Id)
          .then((res) => {
            if (res.status == 200) {
              toast.success(res.message)
              set_RePlaylist()
            } else {
              toast.error(res.message)
            }
          })
      } else {
        toast.warning('This not your playlist')
      }
    } else {
      toast.warning('Please login to delete your playlist')
    }


  }

  const handleRoutes = () => {
    routes.push(`/playlist?id=${item.Playlist_Id}&type=${item.Type}`);
  };

  return (
    <div
      className={`itemListPlaylist ${info_Playlist?.Playlist_Id == item.Playlist_Id
        ? "itemActive"
        : "itemNotActive"
        }`

      }
    >
      <Image alt="" src={url} width={200} height={200} loading='lazy' />
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

      {showInfo && item.User_Id == userProvider?.User_Id &&
        <div className="toastInfo">
          <h1>Info {{ 1: 'playlist', 2: 'album' }[item.Type]}</h1>
          <ul>
            <li className="overflow__Text">Name: <span>{item.Playlist_Name}</span></li>
            <li>Upload by: <span>{item.Artist}</span></li>
            <li>Public: <span className={`${String(item.is_Publish)}I publicState`}>{String(item.is_Publish)}</span></li>
            <li>Songs: <span>{String(item?.Tracks?.length ?? 0)}</span></li>
            <li className="falseI" onClick={handleDelete}>Delete</li>
          </ul>
        </div>
      }

    </div>
  );
};

export default ItemListPlayList;
