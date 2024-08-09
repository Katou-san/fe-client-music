"use client";
import React, { useEffect, useState } from "react";
import "./trending.scss";
import Image from "next/image";
import { Pause_Icon, Play_Icon } from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { Propose } from "@/apis/Trending";
import { list_songType } from "@/model/songModel";
import imgTemp from '../../../../public/temp.jpg'
import ItemTrending from "@/components/trending/itemTrending";
import { useAds } from "@/contexts/providerAds";
const Page = () => {
  const {
    setList,
    setIndex,
    Set_InfoPlaylist,
    info_Playlist,
    is_Playing,
    setPlay,
    currentList,
    currentIndex
  } = useAudio();
  const { onAds, set_NextList, set_NextSongIndex, set_PercentAds } = useAds()

  const [url, set_Url] = useState({ img: "", thumbnail: "" });
  const [list, set_List] = useState<list_songType>([]);
  useEffect(() => {
    Propose.Get_Song().then((res) => {
      set_List(res.data);
    });
  }, []);


  const Handle_Play = () => {
    if (list.length > 0) {
      if (currentList == list) {
        setPlay();
      } else {
        Set_InfoPlaylist(null);
        setList(list);
        setIndex(0);
      }
    }
    if (onAds) {
      if (list.length > 0 && info_Playlist != null) {
        if (currentList == list) {
          set_NextSongIndex(currentIndex);
        } else {
          set_NextList(list);
          set_NextSongIndex(0);
          Set_InfoPlaylist(null);
        }
      }

    } else {
      if (list.length > 0 && info_Playlist != null) {
        if (currentList == list) {
          setPlay();
        } else {
          Set_InfoPlaylist(null);
          setList(list);
          setIndex(0);
        }
      }
    }
  };

  return (
    <div className="frameDetailPlaylists">
      <header>
        <div className="frameBackground">
          <div className="frameImage">
            <Image alt="" src={url.img || imgTemp} width={100} height={100} loading="lazy" />
          </div>
        </div>
        <div className="frameBanner">
          <div className="contentHeader">
            <div className="frameImange">
              <Image alt="" src={url.img || imgTemp} width={100} height={100} loading="lazy" />
            </div>
            <div className="frameTitleHeader">
              <div className="typePlaylist">Playlist</div>
              <div className="namePlaylist overflow__Text">Trending</div>
              <div className="artistPlaylist"></div>
              <div className="footerTitle">
                <div className="nameWeb">Hotaru</div>
                <span></span>
                <h3>{list.length} songs</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="frameHeaderList">
          <div className="btnPlay " onClick={Handle_Play}>
            {is_Playing ? <Pause_Icon w={40} /> : <Play_Icon w={50} />}
          </div>
        </div>

      </header>
      <div className="frameListPlaylistDetail">
        <div className="listSongPlaylistDetail">
          <div className="titleHeaderPlaylist">
            <div className="itemTitle">
              <span>#</span>
              <span className="startText">info</span>
              <span className="time">time</span>
            </div>
          </div>

          {list.map((song, index) => (
            <ItemTrending song={song} key={index} list={list} index={index} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
