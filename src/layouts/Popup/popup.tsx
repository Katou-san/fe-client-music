"use client";
import React, { useEffect, useRef, useState } from "react";
import "./_popup.scss";
import Image from "next/image";
import {
  AddIcon,
  BackwardIcon,
  ForwardIcon,
  RepeatIcon,
} from "@/Icons/icon_v1";
import {
  ArrowLineRight_Icon,
  Comment_Icon,
  Favorite_Icon,
  List1_Icon,
  Pause_Icon,
  Play_Icon,
  Repeat_Icon,
  Repost_Icon,
  Shuffle_Icon,
  Volume_Icon,
} from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { secondsToMinute } from "@/util/time";
import ListSongPopup from "@/components/popup/currentList/listSongPopup";
import { useLayout } from "@/contexts/providerLayout";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
import ListComment from "@/components/popup/comment/listComment";
const Popup = () => {
  const [url, set_url] = useState("");
  const {
    is_listPopup,
    setShowPopup,
    setShowListPopup,
    is_commentPopup,
    setShowCommentPopup,
  } = useLayout();
  const [togoLike, set_togoLike] = useState(false);
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
      Send.Image_S(currentList[currentIndex]?.Song_Image).then((res) =>
        set_url(URL.createObjectURL(res))
      );
    } else {
      set_url(currentList[currentIndex]?.Song_Image);
    }
  }, [currentIndex, currentList]);

  return (
    <div className="framePopup">
      <div className="headerPopup" onClick={setShowPopup}>
        <div className="iconHeader cursor_pointer">
          <ArrowLineRight_Icon />
        </div>
      </div>
      <div className="musicPlayer">
        <div className="frameImage">
          <Image alt="" src={url} width={1000} height={1000} />
        </div>
        <div className="frameBtnShare">
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
              onClick={() => set_togoLike((prev) => !prev)}
            >
              <Favorite_Icon active={togoLike} w={25} />
            </div>
            <div className="clickSong addicon">
              <AddIcon w={20} />
            </div>
            <div className="clickSong" onClick={setShowCommentPopup}>
              <Comment_Icon w={30} />
            </div>
          </div>
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
        className={`frameListSongPopup ${
          is_listPopup ? "" : "hidenframeListSong"
        }`}
      >
        <ListSongPopup />
      </div>

      <div
        className={`frameListCommentPopup ${
          is_commentPopup ? "" : "hidenframeCommentSong"
        }`}
      >
        <ListComment Song_Id={currentList[currentIndex]?.Song_Id ?? ""} />
      </div>
    </div>
  );
};

export default Popup;
