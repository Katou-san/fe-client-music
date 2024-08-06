"use client";
import { Send } from "@/apis/Send";
import { useAudio } from "@/contexts/providerAudio";
import { PauseIcon, PlayIcon } from "@/Icons/icon_v1";
import { list_songType, songType } from "@/model/songModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import imgTemp from "../../../../public/temp.jpg"
import React, { useEffect, useState } from "react";
type Prop = {
  list: list_songType;
  active: boolean;
  itemSong: songType;
  index: number;
};
const ItemListSong = ({ active, itemSong, list, index }: Prop) => {
  const {
    is_Playing,
    currentIndex,
    currentList,
    setList,
    setIndex,
    setPlay,
    Set_InfoPlaylist,
  } = useAudio();
  const [url, set_url] = useState("");

  useEffect(() => {
    if (itemSong?.Song_Image != undefined) {
      if (URLValidate.isUrl(itemSong?.Song_Image)) {
        Send.Image_S(itemSong.Song_Image).then((res) =>
          set_url(URL.createObjectURL(res))
        );
      } else {
        set_url(itemSong.Song_Image);
      }
    }

  }, [itemSong.Song_Image]);

  const handleClick = () => {
    if (currentList[currentIndex]?.Song_Id != itemSong?.Song_Id) {
      if (currentList != list) setList(list);

      setIndex(index);
      Set_InfoPlaylist(null);
    } else {
      setPlay();
    }
  };

  return (
    <div
      className={`itemListSong ${currentList[currentIndex]?.Song_Id == itemSong.Song_Id
        ? "itemListSongActive"
        : ""
        } `}
    >
      <Image alt="" src={url || imgTemp} width={10} height={10} loading='lazy' />
      <div className="frameBtnContent">
        <div className="contentBtn">
          <h1 className="overflow__Text">{itemSong?.Song_Name}</h1>
          <h3 className="overflow__Text">by {itemSong?.Artist_Name}</h3>
        </div>
        <div className="frameIcon" onClick={handleClick}>
          {is_Playing &&
            currentList[currentIndex]?.Song_Id == itemSong.Song_Id ? (
            <PauseIcon color="#383838" w={27} />
          ) : (
            <PlayIcon color="#383838" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemListSong;
