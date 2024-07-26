"use client";
import { Send } from "@/apis/Send";
import { AudioLineIcon, ImageIcon } from "@/Icons/icon_v1";
import { create_songType, songType, update_songType } from "@/model/songModel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgTemp from '../../../../../public/temp.jpg'
type Props = {
  Get_Value_Form: (value: any) => void;
  Value_Form: create_songType;
  Song: songType
  Set_Change: (value: update_songType) => void
};
export default function FormStep1Edit({ Get_Value_Form, Value_Form, Song, Set_Change }: Props) {
  const [urlImg, set_UrlImg] = useState("");
  const [urlAudio, set_UrlAuido] = useState("");
  useEffect(() => {
    if (Value_Form.Song_Audio != "" && Value_Form.Song_Audio != null) {
      Send.Audio(Value_Form.Song_Audio).then(res => set_UrlAuido(URL.createObjectURL(res)))
    }

    if (typeof Value_Form.Song_Image == 'string') {
      if (Value_Form.Song_Image != '') {
        Send.Image_S(Value_Form.Song_Image).then(res => set_UrlImg(URL.createObjectURL(res)))
      }

    } else {
      set_UrlImg(URL.createObjectURL(Value_Form.Song_Image))
    }
  }, [Value_Form]);
  return (
    <div className="FormStep">
      <div className="LeftContentAddSong">
        <div className="BoxInputAddSong">
          <h4>Name Song</h4>
          <input
            value={Value_Form.Song_Name}
            type="text"
            autoFocus
            placeholder="Name Song"
            id="inputText"
            onChange={(e) => {
              Get_Value_Form({ Song_Name: e.target.value })
              Set_Change({ Song_Name: e.target.value })
            }}
          />
        </div>
        <div className="ImgShow">
          {Value_Form.Song_Image ? (
            <Image src={urlImg || imgTemp} alt="" width={1000} height={1000} />
          ) : (
            <ImageIcon w={80} />
          )}
        </div>
        <label htmlFor="ImgSrc1">Select Img</label>
        <input
          type="file"
          id="ImgSrc1"
          className="none"
          accept="image/*"
          onChange={(e) => {
            Get_Value_Form({
              Song_Image: e.target?.files ? e.target.files[0] : null,
            });

            Set_Change({
              Song_Image: e.target?.files ? e.target.files[0] : null,
            });
          }}
        />
      </div>
      <div className="RightContentAddSong">
        <div className="BoxInputAddSong">
          <h4>Artist</h4>
          <input
            value={Value_Form.Artist}
            type="text"
            autoFocus
            id="inputText"
            placeholder="Artist"
            onChange={(e) => {
              Get_Value_Form({ Artist: e.target.value })
              Set_Change({ Artist: e.target.value })
            }}
          />
        </div>
        <div className="BoxInputAddSong">
          <h4>Audio Src</h4>
          <div
            className={`AudioShow ${!Value_Form.Song_Audio ? "ShowBackGround" : ""
              }`}
          >
            {Value_Form.Song_Audio ? (
              <audio controls src={urlAudio} />
            ) : (
              <AudioLineIcon color={"#fff"} />
            )}
          </div>
        </div>
        <label htmlFor="audioSrc">Select Audio</label>
        <input
          type="file"
          className="none"
          id="audioSrc"
          accept="audio/*"
          onChange={(e) => {

          }}
        />
      </div>
    </div>
  );
}
