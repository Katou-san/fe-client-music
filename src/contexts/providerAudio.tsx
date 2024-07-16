"use client";

import { Send } from "@/apis/Send";
import { playlistType } from "@/model/playlistModel";
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
  repeat: number;
  shuffle: boolean;
  currentIndex: number;
  list: Array<any>;
  currentTime: number;
  duration: number;
  percent_Load: number;
  volume: number;
  currentList: list_songType;
  info_Playlist: null | playlistType;
  Set_InfoPlaylist: (playlist: playlistType | null) => void;
  Set_RefInputRange2: (progressbarRef: RefObject<HTMLInputElement>) => void;
  Set_RefInputRange: (progressbarRef: RefObject<HTMLInputElement>) => void;
  setIndex: (index: number) => void;
  setVolume: (value: number) => void;
  setPlay: () => void;
  setList: (args: any[]) => void;
  setShuffle: (progressbarRef: RefObject<HTMLInputElement>) => void;
  setRepeat: () => void;
  next: (progressbarRef: RefObject<HTMLInputElement>) => void;
  prev: (progressbarRef: RefObject<HTMLInputElement>) => void;
  changeRange: (progressbarRef: RefObject<HTMLInputElement>) => void;
  changeRange2: (progressbarRef: RefObject<HTMLInputElement>) => void;
}

const defaultContext = {
  currentTime: 0,
  duration: 0,
  is_Playing: false,
  repeat: 0,
  shuffle: false,
  currentIndex: -1,
  list: [],
  percent_Load: 0,
  volume: 50,
  currentList: [],
  info_Playlist: null,
  Set_InfoPlaylist: (playlist: playlistType | null) => { },
  Set_RefInputRange: (progressbarRef: RefObject<HTMLInputElement>) => { },
  Set_RefInputRange2: (progressbarRef: RefObject<HTMLInputElement>) => { },
  setIndex: (index: number) => { },
  changeRange: (progressbarRef: RefObject<HTMLInputElement>) => { },
  changeRange2: (progressbarRef: RefObject<HTMLInputElement>) => { },
  setPlay: () => { },
  setList: (args: any[]) => { },
  setShuffle: (progressbarRef: RefObject<HTMLInputElement>) => { },
  setRepeat: () => { },
  next: (progressbarRef: RefObject<HTMLInputElement>) => { },
  prev: (progressbarRef: RefObject<HTMLInputElement>) => { },
  setVolume: (value: number) => { },
};

const contextAudio = createContext<contextType>(defaultContext);

const ProviderAudio = ({ children }: { children: ReactNode }) => {
  const urltemp = "http://localhost:8080/api/v1/send/audio/57534667333.mp3";
  const [progressbarRef, set_progressbarRef] =
    useState<RefObject<HTMLInputElement>>();
  const [progressbarRef2, set_progressbarRef2] =
    useState<RefObject<HTMLInputElement>>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, set_currentTime] = useState(0);
  const [volume, set_volume] = useState(5);
  const [percent_Load, set_percentLoad] = useState(0);
  const [duration, set_duration] = useState(0);
  const [currentIndex, set_CurrentIndex] = useState(0);
  const [playlist, set_Playlist] = useState<list_songType>([]);
  const [currentList, set_CurrentList] = useState<list_songType>([]);
  const [is_Playing, set_isPlaying] = useState(false);
  const [repeat, set_repeat] = useState(0);
  const [shuffle, set_shuffle] = useState(false);
  const [src, set_src] = useState("");
  const [infoPlaylist, set_infoPlaylist] = useState<playlistType | null>(null);

  const Set_RefInputRange = (progressbarRef: RefObject<HTMLInputElement>) => {
    set_progressbarRef(progressbarRef);
  };

  const Set_InfoPlaylist = (playlist: playlistType | null) => {
    set_infoPlaylist(playlist);
  };

  const Set_RefInputRange2 = (progressbarRef: RefObject<HTMLInputElement>) => {
    set_progressbarRef2(progressbarRef);
  };

  const setIndex = (index: number) => {
    set_CurrentIndex(index);
  };

  const changeRange = () => {
    if (
      audioRef.current?.currentTime != null &&
      progressbarRef?.current?.value != null
    ) {
      audioRef.current.currentTime = Number(progressbarRef.current?.value);
      progressbarRef.current?.style.setProperty(
        "--seek-before-width",
        `${(Number(progressbarRef.current.value) / duration) * 100}`
      );
      set_currentTime(Number(progressbarRef.current?.value));
    } else {
      set_currentTime(Number(progressbarRef?.current?.value));
    }
  };

  const changeRange2 = () => {
    if (
      audioRef.current?.currentTime != null &&
      progressbarRef2?.current?.value != null
    ) {
      audioRef.current.currentTime = Number(progressbarRef2.current?.value);
      progressbarRef2.current?.style.setProperty(
        "--seek-before-width",
        `${(Number(progressbarRef2.current.value) / duration) * 100}`
      );
      set_currentTime(Number(progressbarRef2.current?.value));
    } else {
      set_currentTime(Number(progressbarRef?.current?.value));
    }
  };

  const renderDotRange: any = () => {
    setInterval(() => {
      if (
        progressbarRef?.current?.value != null &&
        progressbarRef2?.current?.value != null
      ) {
        if (audioRef?.current?.currentTime) {
          progressbarRef.current.value = String(audioRef.current?.currentTime);
          progressbarRef2.current.value = String(audioRef.current?.currentTime);
          progressbarRef.current?.style.setProperty(
            "--seek-before-width",
            `${(Number(progressbarRef.current.value) / duration) * 100}`
          );
          progressbarRef2.current?.style.setProperty(
            "--seek-before-width",
            `${(Number(progressbarRef.current.value) / duration) * 100}`
          );
          set_currentTime(Number(progressbarRef.current.value));
        }
      }
    }, 1000);
  };

  const handle_play = () => {
    let newState = is_Playing;
    set_isPlaying(!newState);
    if (!newState) {
      audioRef.current?.play();
      renderDotRange();
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

  const handle_Repeat = () => {
    if (repeat == 2) {
      set_repeat(0);
    } else {
      set_repeat(repeat + 1);
    }
  };

  const handle_EndSong = () => {
    if (repeat == 0) {
      if (currentIndex == currentList.length - 1) {
        set_isPlaying(false);
      } else {
        set_CurrentIndex(HandleSong.next(currentIndex, currentList));
        set_isPlaying(true);
        renderDotRange();
      }
    }

    if (repeat == 1) {
      if (currentIndex == currentList.length - 1) {
        set_CurrentIndex(0);
        set_isPlaying(true);
        renderDotRange();
      } else {
        set_CurrentIndex(HandleSong.next(currentIndex, currentList));
        set_isPlaying(true);
        renderDotRange();
      }
    }

    if (repeat == 2) {
      const newstate = currentIndex;
      set_CurrentIndex(currentIndex + 1);
      set_CurrentIndex(newstate);
      set_isPlaying(false);
      set_isPlaying(true);
      renderDotRange();
    }
  };

  const handle_shuffle = () => {
    const state = shuffle;
    if (!state) {
      set_CurrentList(HandleSong.shuffle(playlist));
    } else {
      set_CurrentList(playlist);
    }
    set_shuffle((prev) => !prev);
    renderDotRange();
  };

  const handle_set_Playlist = (list: list_songType) => {
    set_Playlist(list);
  };

  const handle_Next = () => {
    set_CurrentIndex(HandleSong.next(currentIndex, currentList));
    set_isPlaying(true);
    renderDotRange();
  };

  const handle_Prev = () => {
    set_CurrentIndex(HandleSong.prev(currentIndex, currentList));
    set_isPlaying(true);
    renderDotRange();
  };

  useEffect(() => {
    const seconds = Math.floor(
      !Number.isNaN(audioRef.current?.duration)
        ? audioRef.current?.duration
          ? audioRef.current?.duration
          : 0
        : 0
    );
    set_duration(seconds);
  }, [
    audioRef.current?.onloadedmetadata,
    audioRef.current?.readyState,
    audioRef.current?.duration,
    currentIndex,
    currentList,
  ]);

  useEffect(() => {
    set_percentLoad(Math.floor((currentTime / 60 / (duration / 60)) * 100));
  }, [currentIndex, duration, currentTime, currentList]);

  useEffect(() => {
    if (audioRef.current != null) {
      audioRef.current?.play();
    }
    renderDotRange();
  }, [currentIndex, duration]);

  useEffect(() => {
    if (playlist.length > 0) {
      set_CurrentList(playlist);
    } else {
      set_CurrentList([]);
    }
  }, [playlist]);

  useEffect(() => {
    if (currentList.length > 0) {
      if (!URLValidate.isUrl(currentList[currentIndex]?.Song_Audio)) {
        Send.Audio(currentList[currentIndex]?.Song_Audio).then((res) =>
          set_src(URL.createObjectURL(res))
        );
      } else {
        set_src(currentList[currentIndex].Song_Audio);
      }
      set_isPlaying(true);
      renderDotRange();
    }
  }, [currentList, currentIndex]);

  useEffect(() => {
    set_isPlaying(false);
    handle_Volume(volume);
  }, []);
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
        info_Playlist: infoPlaylist,
        Set_InfoPlaylist: Set_InfoPlaylist,
        Set_RefInputRange2: Set_RefInputRange2,
        Set_RefInputRange: Set_RefInputRange,
        setIndex: setIndex,
        setVolume: handle_Volume,
        setPlay: handle_play,
        setList: handle_set_Playlist,
        setShuffle: handle_shuffle,
        setRepeat: handle_Repeat,
        next: handle_Next,
        prev: handle_Prev,
        changeRange: changeRange,
        changeRange2: changeRange2,
      }}
    >
      <audio
        src={src ?? urltemp}
        className="none"
        ref={audioRef}
        onDurationChange={() => {
          set_duration(
            audioRef.current?.duration ? audioRef.current.duration : 0
          );
        }}
        onEnded={handle_EndSong}
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
