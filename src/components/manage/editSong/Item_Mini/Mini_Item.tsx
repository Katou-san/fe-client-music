'use client'
import React, { useEffect, useState } from "react";
import "./Mini_Item.scss";
import { list_songType, songType } from "@/model/songModel";
import Image from "next/image";
import imgTemp from "../../../../../public/temp.jpg"
import { PauseIcon, PlayIcon } from "@/Icons/icon_v1";
import Wavev2Icon from "@/Icons/cusIcons/wave/wavev2";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
type Props = {
  Value_Form: songType
  list: list_songType
  index: number
  active: boolean
  imageFile: any,
  audioFile: any
}
export default function MiniItemUpdate({ Value_Form, list, index, active, imageFile, audioFile }: Props) {
  const [urlImg, set_UrlImg] = useState('')
  const [audioSrc, set_audioSrc] = useState<HTMLAudioElement | null>(null)
  const [Togo_Play, Set_Togo_Play] = useState(false);

  useEffect(() => {
    if (Value_Form?.Song_Image != '' && Value_Form?.Song_Image != null) {
      if (URLValidate.isUrl(Value_Form.Song_Image)) {
        Send.Image_S(Value_Form.Song_Image)
          .then((res) => set_UrlImg(URL.createObjectURL(res)))
      } else {
        set_UrlImg(Value_Form.Song_Image)
      }
    }

    if (Value_Form?.Song_Audio != '' && Value_Form?.Song_Audio != null) {
      if (URLValidate.isUrl(Value_Form.Song_Audio)) {
        Send.Audio(Value_Form.Song_Audio)
          .then((res) => set_audioSrc(new Audio(URL.createObjectURL(res))))
      } else {
        set_audioSrc(new Audio(Value_Form.Song_Audio))
      }
    }

  }, [Value_Form])


  const handleClick = () => {
    if (audioSrc != null) {
      Togo_Play ? audioSrc.play() : audioSrc.pause()
      Set_Togo_Play(!Togo_Play)
    }

  };

  return (
    <div className="frameResultAddSong">
      <div
        className={`itemListSong addSongResult ${!Togo_Play
          ? "itemListSongActive"
          : ""
          } `}
      >
        <Image alt="" src={urlImg || imgTemp} width={100} height={100} loading='lazy' />
        <div className="frameBtnContent">
          <div className="contentBtn">
            <h1 className="overflow__Text">{Value_Form?.Song_Name}</h1>
            <h3 className="overflow__Text">by {Value_Form?.Artist_Name}</h3>
          </div>
          <div className="frameIcon" onClick={handleClick}>
            {
              !Togo_Play ? (
                <PauseIcon color="#383838" w={27} />
              ) : (
                <PlayIcon color="#383838" />
              )}
          </div>
        </div>
        <div className="frameWaveIcon" style={{ width: `100%` }}>
          <Wavev2Icon h={200} w={100} color={Value_Form.Color || '#fff'} />
        </div>
      </div>

    </div>

  );
}
