"use client";
import React, { useEffect, useRef, useState } from "react";
import "./_popup.scss";
import Image from "next/image";
import {
  AddIcon,
  BackwardIcon,
  ForwardIcon,
} from "@/Icons/icon_v1";
import {
  ArrowLineRight_Icon,
  Comment_Icon,
  List1_Icon,
  Pause_Icon,
  Play_Icon,
  Repeat_Icon,
  Repost_Icon,
  Shuffle_Icon,
  Star_Icon,
  Volume_Icon,
} from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { secondsToMinute } from "@/util/time";
import ListSongPopup from "@/components/popup/currentList/listSongPopup";
import { useLayout } from "@/contexts/providerLayout";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
import ListComment from "@/components/popup/comment/listComment";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { create_likeType, likeModel } from "@/model/likeModel";
import { Like } from "@/apis/Like";
import { Track } from "@/apis/Track";
import { toast } from "react-toastify";
import PlaylistModalDropDown from "@/components/customs/modal/playlistModal";
import { Repost } from "@/apis/Repost";
const Popup = () => {
  const userProvider = useSelector((State: RootState) => State.auth)
  const infoProvider = useSelector((State: RootState) => State.info)
  const [drop_Down, set_Drop] = useState(false)
  const [stateLike, set_StateLike] = useState<create_likeType>(
    likeModel.init_create
  );
  const [url, set_url] = useState("");
  const {
    is_listPopup,
    setShowPopup,
    setShowListPopup,
    is_commentPopup,
    setShowCommentPopup,
  } = useLayout();
  const {
    is_Playing,
    repeat,
    shuffle,
    currentList,
    currentTime,
    duration,
    currentIndex,
    setRepeat,
    prev,
    next,
    setPlay,
    changeRange2,
    volume,
    setVolume,
    Set_RefInputRange2,
    setShuffle,
  } = useAudio();
  const progressbarRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (progressbarRef.current?.max != undefined) {
      progressbarRef.current.max = String(duration);
    }
  }, [duration, currentIndex]);

  useEffect(() => {
    if (volumeRef.current?.value != undefined) {
      volumeRef.current.value = String(volume);
    }
  }, [volume]);

  useEffect(() => {
    Set_RefInputRange2(progressbarRef);
  }, [progressbarRef]);

  useEffect(() => {
    if (URLValidate.isUrl(currentList[currentIndex]?.Song_Image)) {
      Send.Image_S(currentList[currentIndex]?.Song_Image).then((res) => {
        set_url(URL.createObjectURL(res))
      });
    } else {
      set_url(currentList[currentIndex]?.Song_Image);

    }
  }, [currentIndex, currentList]);


  useEffect(() => {
    if (userProvider.Access_Token != "" && userProvider.is_Login)
      if (currentList[currentIndex]) {
        Like.Get_Current(currentList[currentIndex]?.Song_Id, 0).then((res) => {
          if (res.status == 200) {
            set_StateLike(res.data)
          }
        });
      }
  }, [userProvider, is_listPopup, currentIndex])



  const handleLike = () => {
    if (userProvider.Access_Token != "" && userProvider.is_Login && infoProvider.Like != '') {
      if (currentList[currentIndex].Song_Id != null && currentList[currentIndex].Song_Id != '') {
        if (stateLike.State == 1) {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: currentList[currentIndex].Song_Id, State: 0, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Delete(infoProvider.Like, currentList[currentIndex].Song_Id)
            })
        } else {
          Like.Togo_Create_Update({ ...stateLike, Topic_Id: currentList[currentIndex].Song_Id, State: 1, Type: 0 })
            .then(res => {
              Get_Like()
              Track.Create({ Playlist_Id: infoProvider.Like, Song_Id: currentList[currentIndex].Song_Id })
            })
        }
      }

    } else {
      toast.error("You need login");
    }
  }

  const Get_Like = () => {
    Like.Get_Current(currentList[currentIndex]?.Song_Id, 0).then((res) => {
      if (res.status == 200) {
        set_StateLike(res.data)
      }
    })
  }

  const handleRepost = () => {
    if (userProvider.Access_Token != '' && userProvider.is_Login) {
      Repost.Create(currentList[currentIndex]?.Song_Id)
        .then((res) => {
          if (res.status == 200) {
            toast.success(res.message)
          } else {
            toast.error(res.message)
          }
        })
    } else {
      toast.error('You need login!')
    }
  }




  return (
    <div className="framePopup">
      <div className="BackgroundPlayer">
        <div className="frameImage">
          <Image alt="" src={url} width={10} height={10} loading="lazy" />
        </div>

      </div>
      <div className="headerPopup" onClick={setShowPopup}>
        <div className="iconHeader cursor_pointer">
          <ArrowLineRight_Icon />
        </div>
      </div>

      <div className="musicPlayer">
        <div className="frameImage">
          <Image alt="" src={url} width={100} height={100} loading="lazy" />
        </div>
        <div className="frameBtnShare" onClick={handleRepost}>
          <div className="btnShare cursor_pointer">
            <Repost_Icon />
            <span>Repost</span>
          </div>
        </div>
        <div className="contentSong">
          <div className="infoSong">
            <h1 className="overflow__Text">
              {currentList[currentIndex]?.Song_Name != undefined
                ? currentList[currentIndex].Song_Name
                : "Name"}
            </h1>
            <h3 className="overflow__Text">
              {currentList[currentIndex]?.Artist != undefined
                ? currentList[currentIndex].Artist
                : "by artits"}
            </h3>
          </div>
          <div className="frameIcon">
            <div
              className="clickSong"
              onClick={handleLike}
            >
              <Star_Icon active={stateLike.State == 1} w={30} />
            </div>
            <div className="clickSong addicon" onClick={() => set_Drop(true)}>
              <AddIcon w={20} />
            </div>
            <div className="clickSong" onClick={setShowCommentPopup}>
              <Comment_Icon w={30} />
            </div>

          </div>
          <PlaylistModalDropDown drop_Down={drop_Down} set_Drop={() => set_Drop(false)} song={currentList[currentIndex]} style={{ left: '40%' }} />
        </div>

        <div className="controlSong">
          <div className="frameLineRange">
            <div className="timePlayerStart">
              {secondsToMinute(currentTime)}
            </div>
            <div className="frameRage">
              <input
                type="range"
                name=""
                id=""
                ref={progressbarRef}
                max={duration}
                onChange={(e) => {
                  changeRange2(progressbarRef);
                }}
              />
            </div>
            <div className="timePlayerEnd">{secondsToMinute(duration)}</div>
          </div>

          <div className="frameBtnPlayer">
            <span></span>
            <div
              className="btnShuffle cursor_pointer"
              onClick={() => setShuffle(progressbarRef)}
            >
              <Shuffle_Icon w={28} color={`${shuffle ? "#3dccfb" : "#fff"}`} />
            </div>
            <div
              className="btnBackward cursor_pointer"
              onClick={() => prev(progressbarRef)}
            >
              <BackwardIcon />
            </div>
            <div
              className="btnPlayPause cursor_pointer"
              onClick={() => {
                setPlay();
              }}
            >
              {is_Playing ? <Pause_Icon w={50} /> : <Play_Icon w={70} />}
            </div>
            <div
              className="btnForward cursor_pointer"
              onClick={() => {
                next(progressbarRef);
              }}
            >
              <ForwardIcon />
            </div>
            <div className="btnRepeat cursor_pointer" onClick={setRepeat}>
              {repeat != 2 && (
                <Repeat_Icon
                  w={30}
                  type={1}
                  color={`${repeat == 1 ? "#37cdff" : "#fff"}`}
                />
              )}
              {repeat == 2 && <Repeat_Icon w={30} type={2} color="#37cdff" />}
            </div>
            <span></span>
          </div>
        </div>

        <div className="footerPlayer">
          <div className="frameVolume cursor_pointer">
            <Volume_Icon type={volume > 6 ? 2 : volume > 0 ? 1 : 0} />
            <div className="framerangeVolume">
              <input
                type="range"
                className="rangeVolume"
                max={10}
                ref={volumeRef}
                onChange={() => {
                  if (volumeRef.current?.value != undefined) {
                    setVolume(Number(volumeRef.current.value));
                  }
                }}
              />
            </div>
          </div>

          <div className="frameIcon cursor_pointer" onClick={setShowListPopup}>
            <List1_Icon />
          </div>
        </div>
      </div>
      <div
        className={`frameListSongPopup ${is_listPopup ? "" : "hidenframeListSong"
          }`}
      >
        <ListSongPopup />
      </div>
      <div
        className={`frameListCommentPopup ${is_commentPopup ? "" : "hidenframeCommentSong"
          }`}
      >
        <ListComment Song_Id={currentList[currentIndex]?.Song_Id ?? ""} />
      </div>
    </div>
  );
};

export default Popup;
