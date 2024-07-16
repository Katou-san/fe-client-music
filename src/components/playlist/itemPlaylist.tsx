"use client";
import { Like } from "@/apis/Like";
import { Send } from "@/apis/Send";
import { Track } from "@/apis/Track";
import PlaylistModalDropDown from "@/components/customs/modal/playlistModal";
import { useAudio } from "@/contexts/providerAudio";
import { RootState } from "@/hooks/redux/store";
import { LineSoundAnimation } from "@/Icons/cusIcons/lineSound";
import { Star_Icon } from "@/Icons/icon_Figma";
import { AddIcon } from "@/Icons/icon_v1";
import { create_likeType, likeModel, list_likeType } from "@/model/likeModel";
import { playlistType } from "@/model/playlistModel";
import { list_songType, songType } from "@/model/songModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {
  song: songType;
  list: list_songType;
  index: number;
  info_Playlist: playlistType;
};
const ItemPlaylist = ({ song, index, list, info_Playlist }: Props) => {
  const userProvider = useSelector((State: RootState) => State.auth)
  const infoProvider = useSelector((State: RootState) => State.info)
  const [drop_Down, set_Drop] = useState(false)
  const { setList, setIndex, Set_InfoPlaylist, currentList, currentIndex } =
    useAudio();
  const [url, set_Url] = useState({ img: "", audio: "" });
  const [listLike, set_listLike] = useState<list_likeType>([]);
  const [stateLike, set_StateLike] = useState<create_likeType>(
    likeModel.init_create
  );


  useEffect(() => {
    Promise.all([
      Like.Get_Current(song.Song_Id, 0).then((res) => {
        if (res.status == 200) {
          set_StateLike(res.data)
        }
      }),
      Like.Get_Song(song.Song_Id).then((res) => set_listLike(res.data))
    ])
    if (URLValidate.isUrl(song.Song_Image)) {
      Send.Image_S(song.Song_Image).then((res) =>
        set_Url({ ...url, img: URL.createObjectURL(res) })
      );
    } else {
      set_Url({ ...url, img: song.Song_Image });
    }
  }, [song]);


  const Get_Like = () => {
    Like.Get_Song(song.Song_Id).then((res) => {
      set_listLike(res.data);
    })
    Like.Get_Current(song.Song_Id, 0).then((res) => {
      if (res.status == 200) {
        set_StateLike(res.data)
      }
    })
  }

  const Handle_Play = () => {
    if (list.length > 0 && info_Playlist != null) {
      if (currentList == list) {
        setIndex(index);
      } else {
        Set_InfoPlaylist(info_Playlist);
        setList(list);
        setIndex(index);
      }
    }
  };
  const handleLike = () => {
    if (userProvider.Access_Token != "" && userProvider.is_Login == true && infoProvider.Like != '') {
      if (song.Song_Id != null && song.Song_Id != '') {
        if (stateLike.State == 1) {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: song.Song_Id, State: 0, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Delete(infoProvider.Like, song.Song_Id)
            })
        } else {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: song.Song_Id, State: 1, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Create({ Playlist_Id: infoProvider.Like, Song_Id: song.Song_Id })
            })
        }
      }

    } else {
      toast.error("You need login");
    }
  };
  return (
    <div
      className={`itemPlaylistDetail ${currentList[currentIndex]?.Song_Id == song.Song_Id &&
        "itemPlaylistDetailActive"
        } `}
    >
      <h3>
        {currentList[currentIndex]?.Song_Id == song.Song_Id && (
          <LineSoundAnimation />
        )}
        {currentList[currentIndex]?.Song_Id != song.Song_Id && index + 1}
      </h3>
      <div className="infoItemPlaylistDetail" onClick={Handle_Play}>
        <div className="frameImage">
          <Image alt="" src={url.img} width={1000} height={1000} loading='lazy' />
        </div>
        <div className="infoItem">
          <h1>{song.Song_Name}</h1>
          <h3>{song.Artist}</h3>
        </div>
      </div>
      <div className="time"></div>
      <div className="frameIcon" >
        <div
          className={`starIcon ${stateLike.State == 1
            ? "starAcive"
            : ""
            }`}
          onClick={handleLike}
        >
          <Star_Icon w={30} />
          <h3>{listLike.length}</h3>
        </div>
        <div className="addIcon" onClick={() => set_Drop(true)}>
          <AddIcon />
        </div>
      </div>
      <PlaylistModalDropDown drop_Down={drop_Down} set_Drop={() => set_Drop(false)} song={song} style={{ left: '70%' }} />
    </div>
  );
};

export default ItemPlaylist;
