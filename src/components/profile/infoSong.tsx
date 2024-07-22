"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import imgTemp from "../../../public/temp.jpg";
import { Pause_Icon, Play_Icon } from "@/Icons/icon_Figma";
import { songType } from "@/model/songModel";
import { useAudio } from "@/contexts/providerAudio";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
type Props = {
    song: songType;
};
const InfoSong = ({ song }: Props) => {
    const progressbarRef = useRef<HTMLInputElement>(null);
    const [checkSong, set_Check] = useState(false)
    const [url, set_url] = useState('')
    const {
        is_Playing,
        Set_RefInputRange3,
        currentIndex,
        duration,
        currentList,
        setIndex,
        setList,
        changeRange3,
    } = useAudio();

    const handlePlay = () => {
        Set_RefInputRange3(progressbarRef);
        setIndex(0);
        setList([song]);
    };

    useEffect(() => {
        if (song?.Song_Image != '' && song?.Song_Image != undefined) {
            if (URLValidate.isUrl(song.Song_Image)) {
                Send.Image_S(song.Song_Image)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(song.Song_Image)
            }
        }
    }, [song])

    useEffect(() => {
        if (progressbarRef.current?.max != undefined) {
            progressbarRef.current.max = String(duration);
        }
        if (currentList[currentIndex]?.Song_Id != undefined) {
            set_Check(currentList[currentIndex]?.Song_Id == song?.Song_Id)
        }

    }, [duration, currentIndex]);

    return (
        <div className="infoSong">
            <div className="headerInfoSong">
                <div className="frameImg">
                    <Image src={url || imgTemp} alt="" width={50} height={50} />
                </div>
                <div className="ContentSong">
                    <div className="infoSongDetail ">
                        <h1 className="txtHeader overflow__Text">{song.Song_Name}</h1>
                        <h3 className="overflow__Text">by {song.Artist}</h3>
                    </div>
                    <div className="footerSong">
                        <div className={`frameBtnPlay ${!checkSong && 'tranformBtn'} cu`} onClick={handlePlay}>
                            {is_Playing ? (
                                checkSong ? (
                                    <Pause_Icon w={40} />
                                ) : (
                                    <Play_Icon w={40} />
                                )
                            ) : (
                                <Play_Icon w={40} />
                            )}
                        </div>
                        <div className="frameRange">
                            <input
                                type="range"
                                className={`${!checkSong && 'hiddenInput'}`}
                                name=""
                                id=""
                                max={duration}
                                ref={progressbarRef}
                                onChange={() => {
                                    changeRange3(progressbarRef);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoSong;
