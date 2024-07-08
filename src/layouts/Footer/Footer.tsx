"use client";
import { useEffect, useRef, useState } from "react";
import "./_footer.scss";
import Image from "next/image";
import { BackwardIcon, ForwardIcon, RepeatIcon } from "@/Icons/icon_v1";
import {
  List1_Icon,
  Pause_Icon,
  Play_Icon,
  Shuffle_Icon,
  Volume_Icon,
} from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { secondsToMinute } from "@/util/time";
import { useLayout } from "@/contexts/providerLayout";
import { toast } from "react-toastify";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";

function Footer() {
  const { setShowPopup, setShowListPopup } = useLayout();
  const [url, set_url] = useState("");
  const progressbarRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const {
    is_Playing,
    setPlay,
    duration,
    currentTime,
    currentList,
    changeRange,
    setVolume,
    next,
    prev,
    volume,
    currentIndex,
    setShuffle,
    shuffle,
    Set_RefInputRange,
  } = useAudio();

  useEffect(() => {
    if (currentList.length > 0) {
      if (URLValidate.isUrl(currentList[currentIndex].Song_Image)) {
        Send.Image_S(currentList[currentIndex].Song_Image).then((res) =>
          set_url(URL.createObjectURL(res))
        );
      } else {
        set_url(currentList[currentIndex].Song_Image);
      }
    }
  }, [currentList, currentIndex]);

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
    Set_RefInputRange(progressbarRef);
  }, [progressbarRef]);
  return (
    <footer>
      <div className="frameFooter">
        <div className="contentStart cursor_pointer" onClick={setShowPopup}>
          <Image alt="" src={url} width={1000} height={1000} />
          <div className="contentFooter">
            <h1 className="overflow__Text">Name</h1>
            <h3 className="overflow__Text">by artist</h3>
          </div>
        </div>
        <div className="frameCenter">
          <div className="contentCenter">
            <div className="topCenter">
              <div className="btnFooter">
                <span></span>
                <div
                  className="btnShuffle cursor_pointer"
                  onClick={() => setShuffle(progressbarRef)}
                >
                  <Shuffle_Icon w={30} color={`${shuffle ? "#000" : "#fff"}`} />
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
                  {is_Playing ? <Pause_Icon w={30} /> : <Play_Icon w={50} />}
                </div>
                <div
                  className="btnForward cursor_pointer"
                  onClick={() => next(progressbarRef)}
                >
                  <ForwardIcon />
                </div>
                <div className="btnRepeat cursor_pointer">
                  <RepeatIcon active={false} w={22} />
                </div>

                <span></span>
              </div>
            </div>
            <div className="bottonCenter">
              <div className="timeFooterStart">
                {secondsToMinute(currentTime)}
              </div>
              <div className="frameLineSong">
                <input
                  type="range"
                  name=""
                  id="lineSong"
                  defaultValue={5}
                  ref={progressbarRef}
                  max={duration}
                  onChange={(e) => {
                    changeRange(progressbarRef);
                  }}
                />
              </div>

              <div className="timeFooterEnd">{secondsToMinute(duration)}</div>
            </div>
          </div>
        </div>
        <span></span>
        <div className="contentEnd">
          <div className="IconList cursor_pointer" onClick={setShowListPopup}>
            <List1_Icon />
          </div>
          <div className="frameVolume cursor_pointer">
            <Volume_Icon type={volume > 6 ? 2 : volume > 0 ? 1 : 0} />
            <div className="framerangeVolume">
              <input
                type="range"
                defaultValue={volume}
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
