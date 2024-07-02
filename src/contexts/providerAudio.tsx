"use client";

import { Send } from "@/apis/Send";
import { list_songType } from "@/model/songModel";
import { HandleSong } from "@/util/handle";
import { URLValidate } from "@/util/validate/url";
import React, {
    createContext,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";


interface contextType {
    is_Playing: boolean;
    repeat: boolean;
    shuffle: boolean;
    currentIndex: number;
    list: Array<any>;
    currentTime: number;
    duration: number;
    percent_Load: number;
    volume: number;
    currentList: list_songType,
    setTest: (progressbarRef: RefObject<HTMLInputElement>) => void;
    setIndex: (index: number) => void;
    setVolume: (value: number) => void;
    setPlay: (progressbarRef: RefObject<HTMLInputElement>) => void;
    setList: (args: any[]) => void;
    setShuffle: (progressbarRef: RefObject<HTMLInputElement>) => void;
    setRepeat: (progressbarRef: RefObject<HTMLInputElement>) => void;
    next: (progressbarRef: RefObject<HTMLInputElement>) => void;
    prev: (progressbarRef: RefObject<HTMLInputElement>) => void;
    changeRange: (progressbarRef: RefObject<HTMLInputElement>) => void;
}

const defaultContext = {
    currentTime: 0,
    duration: 0,
    is_Playing: false,
    repeat: false,
    shuffle: false,
    currentIndex: -1,
    list: [],
    percent_Load: 0,
    volume: 50,
    currentList: [],
    setTest: (progressbarRef: RefObject<HTMLInputElement>) => { },
    setIndex: (index: number) => { },
    changeRange: (progressbarRef: RefObject<HTMLInputElement>) => { },
    setPlay: (progressbarRef: RefObject<HTMLInputElement>) => { },
    setList: (args: any[]) => { },
    setShuffle: (progressbarRef: RefObject<HTMLInputElement>) => { },
    setRepeat: (progressbarRef: RefObject<HTMLInputElement>) => { },
    next: (progressbarRef: RefObject<HTMLInputElement>) => { },
    prev: (progressbarRef: RefObject<HTMLInputElement>) => { },
    setVolume: (value: number) => { },
};

const contextAudio = createContext<contextType>(defaultContext);

const ProviderAudio = ({ children }: { children: ReactNode }) => {
    const urltemp = 'http://localhost:8080/api/v1/send/audio/57534667333.mp3'
    const [progressTest, set_progress] = useState<RefObject<HTMLInputElement>>()
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, set_currentTime] = useState(0);
    const [volume, set_volume] = useState(5);
    const [percent_Load, set_percentLoad] = useState(0);
    const [duration, set_duration] = useState(0);
    const [currentIndex, set_CurrentIndex] = useState(0);
    const [playlist, set_Playlist] = useState<list_songType>([]);
    const [currentList, set_CurrentList] = useState<list_songType>([])
    const [is_Playing, set_isPlaying] = useState(false);
    const [repeat, set_repeat] = useState(false);
    const [shuffle, set_shuffle] = useState(false);
    const [src, set_src] = useState('')

    const Test = (progressbarRef: RefObject<HTMLInputElement>) => {
        console.log(progressbarRef.current)
        set_progress(progressbarRef)
    }

    const setIndex = (index: number) => {
        set_CurrentIndex(index)
    }

    const changeRange = (progressbarRef: RefObject<HTMLInputElement>) => {
        if (audioRef.current?.currentTime != null && progressbarRef.current?.value != null) {
            audioRef.current.currentTime = Number(progressbarRef.current?.value);
            progressbarRef.current?.style.setProperty('--seek-before-width', `${Number(progressbarRef.current.value) / duration * 100}`)
            set_currentTime(Number(progressbarRef.current?.value));
        } else {
            set_currentTime(Number(progressbarRef.current?.value));
        }
    };

    const renderDotRange: any = (progressbarRef: RefObject<HTMLInputElement>) => {
        setInterval(() => {
            if (progressbarRef?.current?.value) {
                if (audioRef?.current?.currentTime) {
                    progressbarRef.current.value = String(audioRef.current?.currentTime);
                    progressbarRef.current?.style.setProperty(
                        "--seek-before-width",
                        `${(Number(progressbarRef.current.value) / duration) * 100}`
                    );
                    set_currentTime(Number(progressbarRef.current.value));
                }
            }
        }, 500);
    };

    const handle_play = (progressbarRef: RefObject<HTMLInputElement>) => {
        let newState = is_Playing;
        set_isPlaying(!newState);
        if (!newState) {
            audioRef.current?.play();
            renderDotRange(progressTest);
        } else {
            audioRef.current?.pause();
        }
    };

    const handle_Volume = (value: number) => {
        if (audioRef.current?.volume != undefined) {
            audioRef.current.volume = value / 10;
            set_volume(value);
        }
    };

    const handle_Repeat = (progressbarRef: RefObject<HTMLInputElement>) => {
        set_repeat((prev) => !prev);
        renderDotRange(progressbarRef);
    };

    const handle_shuffle = (progressbarRef: RefObject<HTMLInputElement>) => {
        const state = shuffle
        if (!state) {
            set_CurrentList(HandleSong.shuffle(playlist))
        } else {
            set_CurrentList(playlist)
        }
        set_shuffle((prev) => !prev);
        renderDotRange(progressbarRef);
    };

    const handle_set_Playlist = (list: Array<any>) => {
        set_Playlist(list);
    };

    const handle_Next = (progressbarRef: RefObject<HTMLInputElement>) => {
        set_CurrentIndex(HandleSong.next(currentIndex, currentList))
        set_isPlaying(true)
        renderDotRange(progressbarRef);
    };

    const handle_Prev = (progressbarRef: RefObject<HTMLInputElement>) => {
        set_CurrentIndex(HandleSong.prev(currentIndex, currentList))
        set_isPlaying(true)
        renderDotRange(progressbarRef);
    };

    useEffect(() => {
        const seconds = Math.floor(!Number.isNaN(audioRef.current?.duration) ? audioRef.current?.duration ? audioRef.current?.duration : 0 : 0);
        set_duration(seconds);
    }, [
        audioRef.current?.onloadedmetadata,
        audioRef.current?.readyState,
        audioRef.current?.duration,
        currentIndex,
        currentList
    ]);

    useEffect(() => {
        set_percentLoad(Math.floor((currentTime / 60 / (duration / 60)) * 100));
    }, [currentIndex, duration, currentTime, currentList]);

    useEffect(() => {
        if (audioRef.current != null) {
            audioRef.current?.play()
        }
    }, [currentIndex, duration])

    useEffect(() => {
        if (playlist.length > 0) {
            set_CurrentList(playlist)
        }
    }, [playlist])

    useEffect(() => {
        if (currentList.length > 0) {
            if (!URLValidate.isUrl(currentList[currentIndex].Song_Audio)) {
                Send.Audio(currentList[currentIndex].Song_Audio)
                    .then((res) => set_src(URL.createObjectURL(res)))
            } else {
                set_src(currentList[currentIndex].Song_Audio)
            }
            set_isPlaying(true)
        }
    }, [currentList, currentIndex])


    useEffect(() => {
        set_isPlaying(false);
        handle_Volume(volume)
        // set_Playlist([
        //     "http://localhost:8080/api/v1/send/audio/57534667333.mp3",
        //     "http://localhost:8080/api/v1/send/audio/2024542147654159.m4a"
        // ])
    }, [])
    return (
        <contextAudio.Provider
            value={{
                percent_Load: percent_Load,
                is_Playing: is_Playing,
                repeat: repeat,
                shuffle: shuffle,
                currentIndex: currentIndex,
                list: playlist,
                currentTime: currentTime,
                duration: duration,
                volume: volume,
                currentList: currentList,
                setTest: Test,
                setIndex: setIndex,
                setVolume: handle_Volume,
                setPlay: handle_play,
                setList: handle_set_Playlist,
                setShuffle: handle_shuffle,
                setRepeat: handle_Repeat,
                next: handle_Next,
                prev: handle_Prev,
                changeRange: changeRange,
            }}
        >
            <audio
                src={src ?? urltemp}
                className="none"
                ref={audioRef}
                onDurationChange={() => {
                    set_duration(audioRef.current?.duration ? audioRef.current.duration : 0)
                }}
                onEnded={() => { set_isPlaying(false) }}
                onTimeUpdate={(e) => {
                    set_currentTime(Math.floor(audioRef.current?.currentTime ?? 0 / 60));
                }}
            />
            {children}
        </contextAudio.Provider>
    );
};

const useAudio = () => {
    return useContext(contextAudio);
};
export { ProviderAudio, contextAudio, useAudio };
