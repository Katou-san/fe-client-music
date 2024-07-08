"use client";
import React, { useEffect, useRef } from "react";
import "./_listSong.scss";
import ItemListSong from "@/components/home/Songs/itemListSong";
import { ArrowLeftIcon, ArrowRightIcon } from "@/Icons/icon_v1";
import { list_songType } from "@/model/songModel";

type Props = {
  arraySong: list_songType;
};
const ListSong = ({ arraySong }: Props) => {
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
        <h1>List song</h1>
        <div className="btnListSong">
          <div className="back btnClick" onClick={() => handeNext("prev")}>
            <ArrowLeftIcon />
          </div>
          <div className="next btnClick" onClick={() => handeNext("next")}>
            <ArrowRightIcon />
          </div>
        </div>
      </div>
      <div className="frameListSong" ref={listRef}>
        {arraySong.map((item, index) => {
          return (
            <ItemListSong
              key={index}
              active={index == 0}
              itemSong={item}
              list={arraySong}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListSong;
