"use client";
import { Like } from "@/apis/Like";
import { Send } from "@/apis/Send";
import { RootState } from "@/hooks/redux/store";
import { Star_Icon } from "@/Icons/icon_Figma";
import { AddIcon } from "@/Icons/icon_v1";
import { list_likeType } from "@/model/likeModel";
import { list_songType, songType } from "@/model/songModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  song: songType;
  list: list_songType;
  index: number;
};
const ItemTrending = ({ song, index, list }: Props) => {
  const getUser = useSelector((State: RootState) => State.auth);
  const [url, set_Url] = useState({ img: "", audio: "" });
  const [star, set_Star] = useState(false);
  const [listLike, set_listLike] = useState<list_likeType>([]);

  useEffect(() => {
    if (URLValidate.isUrl(song.Song_Image)) {
      Send.Image_S(song.Song_Image).then((res) =>
        set_Url({ ...url, img: URL.createObjectURL(res) })
      );
    } else {
      set_Url({ ...url, img: song.Song_Image });
    }

    Like.Get_Song(song.Song_Id).then((res) => set_listLike(res.data));
  }, [song]);

  const handleLike = () => {};
  return (
    <div className="itemPlaylistDetail">
      <h3>{index + 1}</h3>
      <div className="infoItemPlaylistDetail">
        <div className="frameImage">
          <Image alt="" src={url.img} width={1000} height={1000} />
        </div>
        <div className="infoItem">
          <h1>{song.Song_Name}</h1>
          <h3>{song.Artist}</h3>
        </div>
      </div>
      <div className="time"></div>
      <div className="frameIcon">
        <div
          className={`starIcon ${
            listLike.find((item) => item.User_Id == getUser.User_Id)
              ? "starAcive"
              : ""
          }`}
        >
          <Star_Icon w={30} />
          <h3>{listLike.length}</h3>
        </div>
        <div className="addIcon">
          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default ItemTrending;
