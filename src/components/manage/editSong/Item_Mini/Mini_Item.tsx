'use client'
import React, { useEffect, useRef, useState } from "react";
import "./Mini_Item.scss";
import { create_songType } from "@/model/songModel";
import Image from "next/image";
import { Pause_Icon, Play_Icon } from "@/Icons/icon_Figma";
import { Send } from "@/apis/Send";
type Props = {
  Value_Form: create_songType
}
export default function MiniItem({ Value_Form }: Props) {
  const [urlImg, set_UrlImg] = useState('')
  const [urlAudio, set_Audio] = useState('')
  const Audioref = useRef<HTMLAudioElement | null>(null)
  const [Togo_Play, Set_Togo_Play] = useState(false);

  useEffect(() => {
    if (Audioref.current) {
      Togo_Play ? Audioref.current.play() : Audioref.current.pause();
    }

  }, [Togo_Play]);

  useEffect(() => {

    Send.Audio(Value_Form.Song_Audio).then(res => set_Audio(URL.createObjectURL(res)))

    if (typeof Value_Form.Song_Image == 'string') {
      Send.Image_S(Value_Form.Song_Image).then(res => set_UrlImg(URL.createObjectURL(res)))
    } else {
      set_UrlImg(URL.createObjectURL(Value_Form.Song_Image))
    }
  }, [Value_Form.Song_Image])

  useEffect(() => {
    if (Audioref.current) {
      Audioref.current.addEventListener("ended", () => Set_Togo_Play(false));
    }

    return () => {
      if (Audioref.current)
        Audioref.current.removeEventListener("ended", () => Set_Togo_Play(false));
    };
  }, []);

  return (
    <div className="Mini_Item_Frame">
      <div
        className="Content_Mini_Item"
        style={{ backgroundColor: `${Value_Form.Color}` }}
      >
        <Image
          src={
            urlImg
          }
          alt="hello"
          width={1000}
          height={1000}
        />
        <div className="Content_Song_Mini_Item">
          <div className="Name_Song_Mini_Item">{Value_Form.Song_Name}</div>
          <div className="User_Song_Mini_Item">
            {Value_Form.Artist}
          </div>
        </div>

        <div
          className="controll_Mini_Item"
          onClick={() => {
            Set_Togo_Play((prev) => !prev);
          }}
        >
          {Togo_Play ? <Pause_Icon w={40} /> : <Play_Icon w={45} />}
        </div>

        <audio src={urlAudio} className="none" ref={Audioref} />
      </div>
    </div>
  );
}
