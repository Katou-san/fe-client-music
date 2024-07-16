"use client";
import React, { useEffect, useState } from "react";
import "./_playlist.scss";
import Image from "next/image";
import { Pause_Icon, Play_Icon, Star_Icon } from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { list_songType } from "@/model/songModel";
import { useSearchParams } from "next/navigation";
import { Playlist } from "@/apis/Playlist";
import { playlistType } from "@/model/playlistModel";
import { Track } from "@/apis/Track";
import { Send } from "@/apis/Send";
import { URLValidate } from "@/util/validate/url";
import { Like } from "@/apis/Like";
import { create_likeType, likeModel, list_likeType } from "@/model/likeModel";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { toast } from "react-toastify";
import ItemPlaylist from "@/components/playlist/itemPlaylist";
import imgTemp from "../../../../public/temp.jpg"
const Page = () => {
  const {
    setList,
    setIndex,
    Set_InfoPlaylist,
    is_Playing,
    setPlay,
    currentList,
  } = useAudio();

  const userProvider = useSelector((state: RootState) => state.auth);
  const seachParam = useSearchParams();
  const PlaylistId = seachParam.get("id");

  const [imageUrl, set_ImgUrl] = useState("");
  const [thumbUrl, set_ThumbUrl] = useState("");
  const [info_Playlist, set_info] = useState<playlistType | null>(null);
  const [list, set_List] = useState<list_songType>([]);

  const [listLike, setListLike] = useState<list_likeType>([]);
  const [stateLike, set_StateLike] = useState<create_likeType>(
    likeModel.init_create
  );

  useEffect(() => {
    if (PlaylistId != undefined && PlaylistId != null) {
      Promise.all([
        Playlist.Get_Id(1, PlaylistId).then((res) => set_info(res.data)),
        Track.Get_Track(PlaylistId).then((res) => set_List(res.data)),
        Like.Get_Playlist(PlaylistId).then((res) => {
          setListLike(res.data);
        }),
        Like.Get_Current(PlaylistId, 1).then((res) => {
          if (res.status == 200) {
            set_StateLike(res.data)
          }
        })
      ]);
    }
  }, [PlaylistId, userProvider]);

  useEffect(() => {
    if (info_Playlist != undefined && info_Playlist != null) {
      if (URLValidate.isUrl(info_Playlist.Image)) {
        Send.Image_P(info_Playlist.Image).then((res) =>
          set_ImgUrl(URL.createObjectURL(res))
        );
      } else {
        set_ImgUrl(info_Playlist.Image);
      }
      if (URLValidate.isUrl(info_Playlist.Thumbnail)) {
        Send.Thumnail_P(info_Playlist.Thumbnail).then((res) =>
          set_ThumbUrl(URL.createObjectURL(res))
        );
      } else {
        set_ThumbUrl(info_Playlist.Thumbnail);
      }
    }
  }, [info_Playlist, PlaylistId]);



  const HandleLike = () => {
    if (userProvider.Access_Token != "" && userProvider.is_Login == true) {
      if (info_Playlist?.Playlist_Id != null && info_Playlist.Playlist_Id != '') {
        if (stateLike.State == 1) {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: info_Playlist.Playlist_Id, State: 0, Type: 1 })
            .then(res => {
              Get_Like()
            })
        } else {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: info_Playlist.Playlist_Id, State: 1, Type: 1 })
            .then(res => {
              Get_Like()
            })
        }
      }

    } else {
      toast.error("You need login");
    }
  };

  const Get_Like = () => {
    if (info_Playlist?.Playlist_Id != null && info_Playlist?.Playlist_Id != '') {
      Like.Get_Playlist(info_Playlist.Playlist_Id).then((res) => {
        setListLike(res.data);
      })
      Like.Get_Current(info_Playlist.Playlist_Id, 1).then((res) => {
        if (res.status == 200) {
          set_StateLike(res.data)
        }
      })
    }

  }

  const Handle_Play = () => {
    if (list.length > 0 && info_Playlist != null) {
      if (currentList == list) {
        setPlay();
      } else {
        Set_InfoPlaylist(info_Playlist);
        setList(list);
        setIndex(0);
      }
    }
  };

  return (
    <>
      {info_Playlist == null && <div>Not found playlist</div>}
      {info_Playlist != null && (
        <div className="frameDetailPlaylist">
          <header>
            <div className="frameBackground">
              <div className="frameImage">
                <Image alt="" src={thumbUrl || imgTemp} width={1000} height={1000} />
              </div>
            </div>
            <div className="frameBanner">
              <div className="contentHeader">
                <div className="frameImange">
                  <Image alt="" src={imageUrl || imgTemp} width={1000} height={1000} />
                </div>
                <div className="frameTitleHeader">
                  <div className="typePlaylist">Playlist</div>
                  <div className="namePlaylist overflow__Text">
                    {info_Playlist?.Playlist_Name}
                  </div>
                  <div className="artistPlaylist"></div>
                  <div className="footerTitle">
                    <div className="nameWeb">{info_Playlist?.User_Id}</div>
                    <span></span>
                    <h3>{list?.length} songs</h3>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="frameListPlaylistDetail">
            <div className="frameHeaderList">
              <div className="btnPlay " onClick={Handle_Play}>
                {is_Playing ? <Pause_Icon w={40} /> : <Play_Icon w={50} />}
              </div>
              <div
                className={`starIconPlaylist ${stateLike.State == 1 && "starAcive"
                  }`}
                onClick={HandleLike}
              >
                <Star_Icon w={40} />
                <h3>{listLike?.length}</h3>
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

              {list.length != 0 &&
                list.map((song, index) => (
                  <ItemPlaylist
                    song={song}
                    key={index}
                    list={list}
                    index={index}
                    info_Playlist={info_Playlist}
                  />
                ))}

              {list.length == 0 && <div>Empty</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
