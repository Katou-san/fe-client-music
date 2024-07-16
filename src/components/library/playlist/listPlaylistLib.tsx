"use client";
import ItemPlaylistLibrary from "@/components/library/playlist/itemPlaylist";
import { ArrowLineLeft_Icon, ArrowLineRight_Icon } from "@/Icons/icon_Figma";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { list_playlistType } from "@/model/playlistModel";
import React, { useEffect, useRef, useState } from "react";
type Props = {
  listPlaylist: list_playlistType;
};
const ListPlaylistLib = ({ listPlaylist }: Props) => {
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
        <h3>Your playlist</h3>
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
          {listPlaylist.length == 0 && (
            <div className="EmtyLinePlaylist">There are no playlists yet</div>
          )}
          {listPlaylist.length > 0 &&
            listPlaylist.map((playlist, index) => (
              <ItemPlaylistLibrary playlist={playlist} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListPlaylistLib;
