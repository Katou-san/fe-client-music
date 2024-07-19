"use client";
import React, { useEffect, useState } from "react";
import "./_favorite.scss";
import Image from "next/image";
import { Pause_Icon, Play_Icon } from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { list_songType } from "@/model/songModel";
import { Playlist } from "@/apis/Playlist";
import { list_playlistType, playlistType } from "@/model/playlistModel";
import { Track } from "@/apis/Track";
import { Send } from "@/apis/Send";
import { URLValidate } from "@/util/validate/url";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import ItemPlaylist from "@/components/playlist/itemPlaylist";
const Page = () => {
  const {
    setList,
    setIndex,
    Set_InfoPlaylist,
    info_Playlist,
    is_Playing,
    setPlay,
    currentList,
  } = useAudio();

  const userProvider = useSelector((state: RootState) => state.auth);

  const [imageUrl, set_ImgUrl] = useState("");
  const [thumbUrl, set_ThumbUrl] = useState("");
  const [info_Playlist_like, set_info] = useState<playlistType | null>(null);
  const [list, set_List] = useState<list_songType>([]);

  useEffect(() => {
    if (userProvider.Access_Token != "" && userProvider.is_Login)
      Playlist.Get_Default().then((res) => {
        const listPlaylist = res.data as list_playlistType;
        listPlaylist.map((playlist) => {
          if (playlist.Playlist_Name.toLowerCase() == "like") {
            set_info(playlist);
          }
        });
      });
  }, [userProvider]);

  useEffect(() => {
    if (info_Playlist_like != undefined && info_Playlist_like != null) {
      Track.Get_Track(info_Playlist_like.Playlist_Id).then((res) => {
        set_List(res.data)
      }
      );

      if (URLValidate.isUrl(info_Playlist_like.Image)) {
        Send.Image_P(info_Playlist_like.Image).then((res) =>
          set_ImgUrl(URL.createObjectURL(res))
        );
      } else {
        set_ImgUrl(info_Playlist_like.Image);
      }

      if (URLValidate.isUrl(info_Playlist_like.Thumbnail)) {
        Send.Thumnail_P(info_Playlist_like.Thumbnail).then((res) =>
          set_ThumbUrl(URL.createObjectURL(res))
        );
      } else {
        set_ThumbUrl(info_Playlist_like.Thumbnail);
      }
    }
  }, [info_Playlist_like]);

  const Handle_Play = () => {
    if (list.length > 0 && info_Playlist_like != null) {
      if (currentList == list) {
        setPlay();
      } else {
        Set_InfoPlaylist(info_Playlist_like);
        setList(list);
        setIndex(0);
      }
    }
  };

  return (
    <>


      <div className="frameDetailPlaylist">
        {userProvider.Access_Token == "" && !userProvider.is_Login && <div className="frameContentError"> <h1>You need login</h1> </div>}
        {userProvider.Access_Token != "" && userProvider.is_Login && info_Playlist_like != null && (<>
          <header>
            <div className="frameBackground">
              <div className="frameImage">
                <Image alt="" src={thumbUrl} width={1000} height={1000} />
              </div>
            </div>
            <div className="frameBanner">
              <div className="contentHeader">
                <div className="frameImange">
                  <Image alt="" src={imageUrl} width={1000} height={1000} />
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
                    info_Playlist={info_Playlist_like}
                  />
                ))}

              {list.length == 0 && <div>Empty</div>}
            </div>
          </div> </>)}
      </div>

    </>
  );
};

export default Page;
