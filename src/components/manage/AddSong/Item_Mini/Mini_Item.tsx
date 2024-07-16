'use client'
import React, { useEffect, useState } from "react";
import "./Mini_Item.scss";
import { create_songType } from "@/model/songModel";
import Image from "next/image";
import { Pause_Icon, Play_Icon } from "@/Icons/icon_Figma";
import imgTemp from "../../../../../public/temp.jpg"
type Props = {
  Value_Form: create_songType
}
export default function MiniItem({ Value_Form }: Props) {
  const [urlImg, set_UrlImg] = useState('')
  const [audioSrc] = useState(
    new Audio(
      Value_Form.Song_Audio ? URL.createObjectURL(Value_Form.Song_Audio) : ""
    )
  );
  const [Togo_Play, Set_Togo_Play] = useState(false);

  useEffect(() => {
    Togo_Play ? audioSrc.play() : audioSrc.pause();
  }, [Togo_Play]);

  useEffect(() => {
    if (Value_Form.Song_Image != '' && Value_Form.Song_Image != null) {
      set_UrlImg(URL.createObjectURL(Value_Form.Song_Image))
    }
  }, [Value_Form.Song_Image])

  useEffect(() => {
    audioSrc.addEventListener("ended", () => Set_Togo_Play(false));
    return () => {
      audioSrc.removeEventListener("ended", () => Set_Togo_Play(false));
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
            urlImg || imgTemp
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
      </div>
    </div>
  );
}
