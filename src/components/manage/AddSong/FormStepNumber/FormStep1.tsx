"use client";
import { AudioLineIcon, ImageIcon } from "@/Icons/icon_v1";
import { create_songType } from "@/model/songModel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgTemp from "../../../../../public/temp.jpg"
type Props = {
  Get_Value_Form: (value: any) => void;
  Value_Form: create_songType;
};
export default function FormStep1({ Get_Value_Form, Value_Form }: Props) {
  const [urlImg, set_UrlImg] = useState("");
  const [urlAudio, set_UrlAuido] = useState("");
  useEffect(() => {
    if (Value_Form.Song_Audio != "" && Value_Form.Song_Audio != null) {
      set_UrlAuido(URL.createObjectURL(Value_Form.Song_Audio));
    }

    if (Value_Form.Song_Image != "" && Value_Form.Song_Image != null) {
      set_UrlImg(URL.createObjectURL(Value_Form.Song_Image));
    }
  }, [Value_Form.Song_Audio, Value_Form.Song_Image]);
  return (
    <div className="FormStep">
      <div className="LeftContentAddSong">
        <div className="BoxInputAddSong">
          <h4>Name Song</h4>
          <input
            value={Value_Form.Song_Name ? Value_Form.Song_Name : ""}
            type="text"
            autoFocus
            placeholder="Name Song"
            id="inputText"
            onChange={(e) => Get_Value_Form({ Song_Name: e.target.value })}
          />
        </div>
        <div className="ImgShow">
          {Value_Form.Song_Image ? (
            <Image src={urlImg || imgTemp} alt="" width={10} height={10} loading="lazy" />
          ) : (
            <ImageIcon w={80} />
          )}
        </div>
        <label htmlFor="ImgSrc">Select Img</label>
        <input
          type="file"
          id="ImgSrc"
          className="none"
          accept="image/*"
          onChange={(e) => {
            Get_Value_Form({
              ...Value_Form,
              Song_Image: e.target?.files ? e.target?.files[0] : null,
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
            onChange={(e) => Get_Value_Form({ Artist: e.target.value })}
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
            Get_Value_Form({
              ...Value_Form,
              Song_Audio: e.target?.files ? e.target?.files[0] : null,
            });
          }}
        />
      </div>
    </div>
  );
}
