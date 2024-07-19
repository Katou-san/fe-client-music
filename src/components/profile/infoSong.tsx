'use client'
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import imgTemp from '../../../public/temp.jpg'
import { Pause_Icon, Play_Icon } from '@/Icons/icon_Figma';
import { songType } from '@/model/songModel';
import { useAudio } from '@/contexts/providerAudio';
type Props = {
    song: songType
}
const InfoSong = ({ song }: Props) => {
    const progressbarRef = useRef<HTMLInputElement>(null)
    const {
        is_Playing,
        Set_RefInputRange3,
        currentIndex,
        duration,
        setIndex,
        setPlay,
        setList,
        setShuffle,
        changeRange3
    } = useAudio();

    const handlePlay = () => {
        Set_RefInputRange3(progressbarRef)
        setIndex(0)
        setList([song])
    }

    useEffect(() => {
        if (progressbarRef.current?.max != undefined) {
            progressbarRef.current.max = String(duration);
        }
    }, [duration, currentIndex]);

    return (
        <div className="infoSong">
            <div className="headerInfoSong">
                <div className="frameImg">
                    <Image src={imgTemp} alt='' width={50} height={50} />
                </div>
                <div className="ContentSong">
                    <div className="infoSong">
                        <h1>{song.Song_Name}</h1>
                        <h3>by {song.Artist}</h3>
                    </div>
                    <div className="footerSong">
                        <div className="frameBtnPlay" onClick={handlePlay}>
                            {is_Playing ? <Pause_Icon w={40} /> : <Play_Icon w={40} />}
                        </div>
                        <div className="frameRange">
                            <input type="range" name="" id=""
                                max={duration}
                                ref={progressbarRef}
                                onChange={() => {
                                    changeRange3(progressbarRef)
                                }} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default InfoSong;
