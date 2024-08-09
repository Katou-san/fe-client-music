"use client";
import { Like } from "@/apis/Like";
import { Send } from "@/apis/Send";
import { Track } from "@/apis/Track";
import { useAudio } from "@/contexts/providerAudio";
import { RootState } from "@/hooks/redux/store";
import { Star_Icon } from "@/Icons/icon_Figma";
import { AddIcon } from "@/Icons/icon_v1";
import { likeModel, likeType, list_likeType } from "@/model/likeModel";
import { list_songType, songType } from "@/model/songModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import imgtTemp from '../../../public/temp.jpg'
import { secondsToMinute } from "@/util/time";
import './_itemTrendding.scss'
import { LineSoundAnimation } from "@/Icons/cusIcons/lineSound";
import { useAds } from "@/contexts/providerAds";
import PlaylistModalDropDown from "@/components/customs/modal/playlistModal";

type Props = {
  song: songType;
  list: list_songType;
  index: number;
};
const ItemTrending = ({ song, index, list }: Props) => {
  const { setList, setIndex, currentList, currentIndex } =
    useAudio();
  const userProvider = useSelector((State: RootState) => State.auth);
  const infoProvider = useSelector((State: RootState) => State.info);
  const [url, set_Url] = useState('');
  const [urlAudio, set_UrlAudio] = useState('');
  const [listLike, set_listLike] = useState<list_likeType>([]);
  const [stateLike, set_StateLike] = useState<likeType>(likeModel.init);
  const [seconds, set_seconds] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { onAds, set_NextList, set_NextSongIndex } = useAds()
  const [drop_Down, set_Drop] = useState(false)


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
        set_Url(URL.createObjectURL(res))
      );
    } else {
      set_Url(song.Song_Image);
    }

    if (URLValidate.isUrl(song.Song_Audio)) {
      Send.Audio(song.Song_Audio).then((res) =>
        set_UrlAudio(URL.createObjectURL(res))
      );
    } else {
      set_UrlAudio(song.Song_Audio);
    }

  }, [song]);

  useEffect(() => {
    set_seconds(Math.floor(
      !Number.isNaN(audioRef.current?.duration)
        ? audioRef.current?.duration
          ? audioRef.current?.duration
          : 0
        : 0
    ))
  }, [urlAudio, audioRef, audioRef.current?.duration, song])


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
    if (onAds) {
      if (list.length > 0) {
        if (currentList == list) {
          set_NextSongIndex(index);
        } else {
          set_NextList(list);
          set_NextSongIndex(index);
        }
      }

    } else {
      if (list.length > 0) {
        if (currentList == list) {
          setIndex(index);
        } else {
          setList(list);
          setIndex(index);
        }
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
    <div className={`itemPlaylistDetail itemTreding  ${currentList[currentIndex]?.Song_Id == song.Song_Id &&
      "itemPlaylistDetailActive"
      }`}>
      <audio src={urlAudio} ref={audioRef} />
      <h3> {currentList[currentIndex]?.Song_Id == song.Song_Id && (
        <LineSoundAnimation />
      )}
        {currentList[currentIndex]?.Song_Id != song.Song_Id && index + 1}</h3>
      <div className="infoItemPlaylistDetail" onClick={Handle_Play}>
        <div className="frameImage">
          <Image alt="" src={url || imgtTemp} width={1000} height={1000} />
        </div>
        <div className="infoItem overflow__Text">
          <h1 className="">{song.Song_Name}</h1>
          <h3 className="">{song?.Artist_Name}</h3>
        </div>
      </div>
      <div className="time">{secondsToMinute(seconds)}</div>
      <div className="frameIcon">
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

export default ItemTrending;
