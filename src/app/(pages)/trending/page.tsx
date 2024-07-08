"use client";
import React, { useEffect, useState } from "react";
import "./_tredding.scss";
import Image from "next/image";
import { Pause_Icon, Play_Icon, Star_Icon } from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { Propose } from "@/apis/Trending";
import { list_songType } from "@/model/songModel";
import ItemTrending from "@/components/trending/itemTrending";
const Page = () => {
  const { is_Playing } = useAudio();
  const [url, set_Url] = useState({ img: "", thumbnail: "" });
  const [list, set_List] = useState<list_songType>([]);
  useEffect(() => {
    Propose.Get_Song().then((res) => {
      set_List(res.data);
    });
  }, []);

  return (
    <div className="frameDetailPlaylist">
      <header>
        <div className="frameBackground">
          <div className="frameImage">
            <Image alt="" src={url.img} width={1000} height={1000} />
          </div>
        </div>
        <div className="frameBanner">
          <div className="contentHeader">
            <div className="frameImange">
              <Image alt="" src={url.img} width={1000} height={1000} />
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
      </header>
      <div className="frameListPlaylistDetail">
        <div className="frameHeaderList">
          <div className="btnPlay ">
            {is_Playing ? <Pause_Icon w={40} /> : <Play_Icon w={50} />}
          </div>
          <div className="starIconPlaylist">
            <Star_Icon w={40} />
            <h3>12</h3>
          </div>
        </div>

        <div className="listSongPlaylistDetail">
          <div className="titleHeaderPlaylist">
            <div className="itemTitle">
              <span>#</span>
              <span className="startText">info</span>
              <span className="startText">time</span>
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
