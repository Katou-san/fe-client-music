"use client";
import { useEffect, useRef, useState } from "react";
import "./_footer.scss";
import Image from "next/image";
import { AddIcon, BackwardIcon, ForwardIcon, RepeatIcon } from "@/Icons/icon_v1";
import {
  List1_Icon,
  Pause_Icon,
  Play_Icon,
  Repeat_Icon,
  Shuffle_Icon,
  Star_Icon,
  Volume_Icon,
} from "@/Icons/icon_Figma";
import { useAudio } from "@/contexts/providerAudio";
import { secondsToMinute } from "@/util/time";
import { useLayout } from "@/contexts/providerLayout";
import { toast } from "react-toastify";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
import imgTemp from '../../../public/temp.jpg'
import Wavev2Icon from "@/Icons/cusIcons/wave/wavev2";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Like } from "@/apis/Like";
import { create_likeType, likeModel } from "@/model/likeModel";
import { Track } from "@/apis/Track";

function Footer() {
  const userProvider = useSelector((state: RootState) => state.auth)
  const { setShowPopup, setShowListPopup } = useLayout();
  const [url, set_url] = useState("");
  const progressbarRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const [stateLike, set_StateLike] = useState<create_likeType>(
    likeModel.init_create
  );
  const infoProvider = useSelector((State: RootState) => State.info)
  const {
    percent_Load,
    setRepeat,
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
    repeat,
    Togo_Volume
  } = useAudio();

  useEffect(() => {
    if (currentList.length > 0) {
      if (URLValidate.isUrl(currentList[currentIndex]?.Song_Image) && currentList[currentIndex]?.Song_Image != undefined) {
        Send.Image_S(currentList[currentIndex]?.Song_Image).then((res) =>
          set_url(URL.createObjectURL(res))
        );
      } else {
        set_url(currentList[currentIndex]?.Song_Image);
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


  useEffect(() => {
    if (userProvider.Access_Token != "" && userProvider.is_Login)
      if (currentList[currentIndex]) {
        Like.Get_Current(currentList[currentIndex]?.Song_Id, 0).then((res) => {
          if (res.status == 200) {
            set_StateLike(res.data)
          }
        });

      }
  }, [userProvider, currentIndex])


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


  return (
    <footer>
      <div className="frameFooter">
        <div className="frameBtnSong">
          <div className="frameIcon btnNextPre" onClick={() => prev(progressbarRef)}>
            <BackwardIcon />
          </div>
          <div className="frameIcon btnPlay" onClick={() => {
            setPlay();
          }}>
            {is_Playing ? <Pause_Icon w={40} color="#000" /> : <Play_Icon w={40} color="#000" />}
          </div>
          <div className="frameIcon btnNextPre" onClick={() => next(progressbarRef)}>
            <ForwardIcon />
          </div>
        </div>
        <div className="frameInfoSong cursor_pointer" onClick={setShowPopup}>
          <div className="frameImg">
            <Image alt="" width={70} height={70} src={url || imgTemp} />
          </div>
          <div className="infoDetail overflow__Text">
            <h1 className="overflow__Text">{currentList[currentIndex]?.Song_Name || 'unknow'}</h1>
            <h4>by {currentList[currentIndex]?.Artist_Name || 'unknow'}</h4>
          </div>
        </div>
        <div className="frameIconsSong">

          <div className="frameIcon " onClick={handleLike}>
            <Star_Icon w={30} active={stateLike.State == 1} />
          </div>
          <div className="frameIcon ">
            <AddIcon />
          </div>
          <div className="frameIcon " onClick={setShowListPopup}>
            <List1_Icon />
          </div>
        </div>
        <div className="frameRage">
          <div className="numberRage">{secondsToMinute(currentTime)}</div>
          <div className="frameInputRage">
            <input
              style={{ accentColor: currentList[currentIndex]?.Color || '#fff' }}
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
            <div className="frameWaveIcon" style={{ width: `${percent_Load}%` }}>
              <Wavev2Icon h={200} w={`${percent_Load}%`} color={currentList[currentIndex]?.Color || '#fff'} />
            </div>
          </div>
          <div className="numberRage">{secondsToMinute(duration)}</div>
        </div>
        <div className="frameBtnHandleSong">
          <div className="frameIcon " onClick={() => setShuffle(progressbarRef)}>
            <Shuffle_Icon w={28} color={`${shuffle ? "#37cdff" : "#fff"}`} />
          </div>
          <div className="frameIcon " onClick={setRepeat}>
            {repeat != 2 && (
              <Repeat_Icon
                w={30}
                type={1}
                color={`${repeat == 1 ? "#37cdff" : "#fff"}`}
              />
            )}
            {repeat == 2 && <Repeat_Icon w={30} type={2} color="#37cdff" />}
          </div>
          <div className="frameVolume" onClick={Togo_Volume}>
            <div className="frameIcon ">
              <Volume_Icon type={volume > 6 ? 2 : volume > 0 ? 1 : 0} w={28} />

            </div>
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

        </div>
      </div>
    </footer>
  );
}

export default Footer;
