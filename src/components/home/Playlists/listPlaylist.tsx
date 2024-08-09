"use client";
import React, { useRef } from "react";
import "./_listPlaylist.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "@/Icons/icon_v1";
import ItemListPlayList from "@/components/home/Playlists/itemListPlayList";
import { list_playlistType } from "@/model/playlistModel";
type Props = {
  arrayPlaylist: list_playlistType;
  type?: 'album' | 'playlist'
  showInfo?: boolean;
};
const ListPlaylist = ({ arrayPlaylist, type = 'playlist', showInfo = false }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handeNext = (type: "next" | "prev") => {
    if (type == "next") {
      if (listRef.current?.scrollLeft) {
        listRef.current.scrollLeft += 190;
      }
    }
    if (type == "prev") {
      if (listRef.current?.scrollLeft) {
        listRef.current.scrollLeft -= 190;
      }
    }
  };
  return (
    <>
      <div className="titleHome">
        <h1>List {type}</h1>
        <div className="btnListPlaylist">
          <div className="back btnClick" onClick={() => handeNext("prev")}>
            <ArrowLeftIcon />
          </div>
          <div className="next btnClick" onClick={() => handeNext("next")}>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
      <div className="frameListPlaylist" ref={listRef}>
        {arrayPlaylist?.map((item, index) => {
          return (
            <ItemListPlayList
              key={index}
              active={index == 0}
              item={item}
              index={index}
              showInfo={showInfo}

            />
          );
        })}
      </div>
    </>
  );
};

export default ListPlaylist;
