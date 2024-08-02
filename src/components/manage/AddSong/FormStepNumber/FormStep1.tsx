"use client";
import { AudioLineIcon, ImageIcon } from "@/Icons/icon_v1";
import { create_songType } from "@/model/songModel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgTemp from "../../../../../public/temp.jpg"
import { Artist } from "@/apis/Artist";
import { artistModel, artistType, list_artistType } from "@/model/artistModel";
import useDebounce from "@/hooks/customs/useDebounce";
type Props = {
  Get_Value_Form: (value: any) => void;
  Value_Form: create_songType;
};
export default function FormStep1({ Get_Value_Form, Value_Form }: Props) {
  const [urlImg, set_UrlImg] = useState("");
  const [urlAudio, set_UrlAuido] = useState("");
  const [list_Artist, Set_ListArtist] = useState<list_artistType>([])
  const [showArtist, set_ShowArtist] = useState(false)
  const [artistInfo, set_artistInfo] = useState<artistType>(artistModel.init)
  const debounceValue = useDebounce(artistInfo.Artist_Name.trim(), 500)

  useEffect(() => {
    if (Value_Form.Song_Audio != "" && Value_Form.Song_Audio != null) {
      set_UrlAuido(URL.createObjectURL(Value_Form.Song_Audio));
    }

    if (Value_Form.Song_Image != "" && Value_Form.Song_Image != null) {
      set_UrlImg(URL.createObjectURL(Value_Form.Song_Image));
    }
  }, [Value_Form.Song_Audio, Value_Form.Song_Image]);


  useEffect(() => {
    if (artistInfo.Artist_Name != '') {
      Artist.Search(debounceValue)
        .then((res) => {
          if (res.status == 200) {
            Set_ListArtist(res.data);
            if (artistInfo.Artist_Id != Value_Form.Artist) {
              set_ShowArtist(true)
            }

          }
        })
    } else {
      Set_ListArtist([])
      set_ShowArtist(false)
    }
  }, [debounceValue])

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
            value={artistInfo.Artist_Name || Value_Form.Artist_Name}
            type="text"
            autoFocus
            id="inputText"
            placeholder="Artist"
            onChange={(e) => {
              Get_Value_Form({ Artist: e.target.value, Artist_Name: e.target.value })
              set_artistInfo({ ...artistInfo, Artist_Name: e.target.value })
            }

            }
          />
          {showArtist && list_Artist.length > 0 &&
            <div className="listArtist">
              <h1>Artists</h1>
              <ul >
                {list_Artist.length > 0 &&
                  list_Artist.map((artist, index) =>
                    <li key={index}
                      onClick={() => {
                        Get_Value_Form({ Artist: artist.Artist_Id, Artist_Name: artist.Artist_Name })
                        set_artistInfo(artist)

                        set_ShowArtist(false)
                      }}
                    >{artist?.Artist_Name}</li>)
                }
              </ul>
            </div>}
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
