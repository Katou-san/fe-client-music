"use client";
import ItemAlbumLibrary from "@/components/library/album/itemAlbum";
import { ArrowLineLeft_Icon, ArrowLineRight_Icon } from "@/Icons/icon_Figma";
import { list_playlistType } from "@/model/playlistModel";
import React, { useRef } from "react";
type Props = {
  listAlbum: list_playlistType;
};
const ListAlbumLib = ({ listAlbum }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handeNext = (type: "next" | "prev") => {
    if (type == "next") {
      if (listRef.current?.scrollLeft != null) {
        listRef.current.scrollLeft += 350;
      }
    }
    if (type == "prev") {
      if (listRef.current?.scrollLeft != null) {
        listRef.current.scrollLeft -= 350;
      }
    }
  };
  return (
    <>
      <div className="headerLineLibrary">
        <h3>Your album</h3>
        <div className="btnList">
          <div className="frameIcon" onClick={() => handeNext("prev")}>
            <ArrowLineLeft_Icon />
          </div>
          <div className="frameIcon" onClick={() => handeNext("next")}>
            <ArrowLineRight_Icon />
          </div>
        </div>
      </div>
      <div className="listLineLibrary">
        <div className="contentList" ref={listRef}>
          {listAlbum.length == 0 && (
            <div className="EmtyLinePlaylist">There are no albums yet</div>
          )}
          {listAlbum.length > 0 &&
            listAlbum.map((playlist, index) => (
              <ItemAlbumLibrary playlist={playlist} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListAlbumLib;
