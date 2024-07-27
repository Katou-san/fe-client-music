"use client";
import { Send } from "@/apis/Send";
import "./_playlistLib.scss";
import { Pause_Icon, Star_Icon } from "@/Icons/icon_Figma";
import { playlistType } from "@/model/playlistModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MoreIcon } from "@/Icons/icon_v1";
import { list_songType } from "@/model/songModel";
import { Track } from "@/apis/Track";
import { Like } from "@/apis/Like";
import { list_likeType } from "@/model/likeModel";
import ModalDropdown from "@/components/library/modal/modalDropdown";
import { useRouter } from "next/navigation";
import imgTemp from "../../../../public/temp.jpg"
type Props = {
  playlist: playlistType;
};
const ItemAlbumLibrary = ({ playlist }: Props) => {
  const routes = useRouter();
  const [listSong, set_ListSong] = useState<list_songType>([]);
  const [listLike, set_ListLike] = useState<list_likeType>([]);
  const [drop_Down, set_Drop] = useState(false);
  const [img, set_Img] = useState("");
  const [thumbnail, set_thumbnail] = useState("");
  useEffect(() => {
    Promise.all([
      Track.Get_Track(playlist.Playlist_Id).then((res) => {
        if (res.data === 200) {
          set_ListSong(res.data);
        }
      }),
      Like.Get_Playlist(playlist.Playlist_Id).then((res) =>
        set_ListLike(res.data)
      ),
    ]);
  }, [playlist]);

  useEffect(() => {
    if (URLValidate.isUrl(playlist.Image)) {
      Send.Image_P(playlist.Image).then((res) =>
        set_Img(URL.createObjectURL(res))
      );
    } else {
      set_Img(playlist.Image);
    }

    if (URLValidate.isUrl(playlist.Thumbnail)) {
      Send.Thumnail_P(playlist.Thumbnail).then((res) =>
        set_thumbnail(URL.createObjectURL(res))
      );
    } else {
      set_thumbnail(playlist.Thumbnail);
    }
  }, []);

  const handleRoutes = () => {
    routes.push(`/playlist?id=${playlist.Playlist_Id}&type=2`);
  };

  return (
    <div className="itemLineLibrary">
      <div className="backgroundItemLine">
        {thumbnail != "" && (
          <Image alt="" src={thumbnail || imgTemp} width={10} height={10} loading="lazy" />
        )}
      </div>
      <div className="leftItemLine" onClick={handleRoutes}>
        <div className="frameImg">
          <Image alt="" src={img || imgTemp} width={100} height={10} loading="lazy" />

        </div>
        <div className="frameLike">
          <div className="likeIcon">
            <Star_Icon w={30} />
          </div>
          <h3>{listLike.length} </h3>
        </div>
      </div>
      <div className="rigthItemLine" onClick={handleRoutes}>
        <div className="contentItemLine">
          <h1>{playlist.Playlist_Name}</h1>
          <h3>{playlist.Artist}</h3>
          <div className="framePublic">
            public:
            <span
              className={`dotPublic ${String("dot" + playlist.is_Publish)}`}
            ></span>
          </div>
          <div className="songQuantity">{listSong.length} songs</div>
        </div>
      </div>
      <div className="frameMore" onClick={() => set_Drop((prev) => !prev)}>
        <MoreIcon />
      </div>
      <div className="frameIconPlay">
        <Pause_Icon w={30} color="#000" />
      </div>
      <ModalDropdown drop_Down={drop_Down} set_Drop={() => set_Drop(false)} playlist={playlist} />
    </div>
  );
};

export default ItemAlbumLibrary;
