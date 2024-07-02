'use client'
import React, { useEffect, useRef, useState } from 'react';
import './_popup.scss'
import Image from 'next/image';
import { BackwardIcon, ForwardIcon, LikeIcon, RepeatIcon } from '@/Icons/icon_v1';
import { ArrowLineRight_Icon, Comment_Icon, Favorite_Icon, List1_Icon, Pause_Icon, Play_Icon, Shuffle_Icon, Volume_Icon } from '@/Icons/icon_Figma';
import { useAudio } from '@/contexts/providerAudio';
import { secondsToMinute } from '@/util/time';
import ListSongPopup from '@/components/popup/listSongPopup';
import { useLayout } from '@/contexts/providerLayout';
const Popup = () => {
    const { is_listPopup, setShowPopup, setShowListPopup } = useLayout()
    const [togoLike, set_togoLike] = useState(false)
    const { is_Playing, currentTime, duration, currentIndex, prev, next, setPlay, changeRange, volume, setVolume } = useAudio()
    const progressbarRef = useRef<HTMLInputElement>(null)
    const volumeRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (progressbarRef.current?.max != undefined) {
            progressbarRef.current.max = String(duration)
        }
    }, [duration, currentIndex])
    useEffect(() => {
        if (volumeRef.current?.value != undefined) {
            volumeRef.current.value = String(volume)
        }
    }, [volume])
    const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"
    return (
        <div className='framePopup'>
            <div className="headerPopup" onClick={setShowPopup}>
                <div className="iconHeader cursor_pointer">
                    <ArrowLineRight_Icon />
                </div>

            </div>
            <div className="musicPlayer">
                <div className="frameImage">
                    <Image alt="" src={url} width={1000} height={1000} />
                </div>
                <div className='frameBtnShare'>
                    <div className="btnShare cursor_pointer">
                        Share
                    </div>
                </div>
                <div className="contentSong">
                    <div className="infoSong">
                        <h1 className='overflow__Text'>Name</h1>
                        <h3 className='overflow__Text'>by art</h3>
                    </div>
                    <div className="frameIcon">
                        <div className="clickSong" onClick={() => set_togoLike(prev => !prev)}>
                            <Favorite_Icon active={togoLike} w={30} />
                        </div>
                        <div className="clickSong">
                            <Comment_Icon w={30} />
                        </div>
                        <div className="clickSong">
                            <Comment_Icon w={30} />
                        </div>
                    </div>

                </div>

                <div className="controlSong">
                    <div className="frameLineRange">
                        <div className="timePlayerStart">{secondsToMinute(currentTime)}</div>
                        <div className="frameRage">
                            <input type="range" name="" id="" ref={progressbarRef} max={duration}
                                onChange={(e) => {
                                    changeRange(progressbarRef)
                                }}
                            />
                        </div>
                        <div className="timePlayerEnd">{secondsToMinute(duration)}</div>
                    </div>

                    <div className="frameBtnPlayer">
                        <span></span>
                        <div className="btnShuffle cursor_pointer">
                            <Shuffle_Icon w={30} />
                        </div>
                        <div className="btnBackward cursor_pointer" onClick={() => prev(progressbarRef)}>
                            <BackwardIcon />
                        </div>
                        <div className="btnPlayPause cursor_pointer" onClick={() => {
                            setPlay(progressbarRef)

                        }}>
                            {is_Playing ? <Pause_Icon w={50} /> : <Play_Icon w={70} />}
                        </div>
                        <div className="btnForward cursor_pointer" onClick={() => { next(progressbarRef) }}>
                            <ForwardIcon />
                        </div>
                        <div className="btnRepeat cursor_pointer">
                            <RepeatIcon active={false} w={22} />
                        </div>
                        <span></span>
                    </div>
                </div>

                <div className="footerPlayer">
                    <div className="frameVolume cursor_pointer">
                        <Volume_Icon type={volume > 6 ? 2 : volume > 0 ? 1 : 0} />
                        <div className="framerangeVolume">
                            <input type="range" className="rangeVolume" max={10} ref={volumeRef} onChange={() => {
                                if (volumeRef.current?.value != undefined) {
                                    setVolume(Number(volumeRef.current.value))
                                }
                            }} />
                        </div>
                    </div>
                    <span></span>
                    <div className="frameIcon cursor_pointer" onClick={setShowListPopup}>
                        <List1_Icon />
                    </div>
                </div>
            </div>
            <div className={`frameListSongPopup ${is_listPopup ? "" : 'hidenframeListSong'}`}>
                <ListSongPopup />
            </div>
        </div>
    );
}

export default Popup;
