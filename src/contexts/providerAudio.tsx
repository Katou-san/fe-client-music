"use client";

import { Send } from "@/apis/Send";
import { useAds } from "@/contexts/providerAds";
import { useLayout } from "@/contexts/providerLayout";
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
  Togo_Volume: () => void
  Set_InfoPlaylist: (playlist: playlistType | null) => void;
  Set_RefInputRange2: (progressbarRef: RefObject<HTMLInputElement>) => void;
  Set_RefInputRange3: (progressbarRef: RefObject<HTMLInputElement>) => void;
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
  changeRange3: (progressbarRef: RefObject<HTMLInputElement>) => void;
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
  Togo_Volume: () => { },
  Set_InfoPlaylist: (playlist: playlistType | null) => { },
  Set_RefInputRange: (progressbarRef: RefObject<HTMLInputElement>) => { },
  Set_RefInputRange2: (progressbarRef: RefObject<HTMLInputElement>) => { },
  Set_RefInputRange3: (progressbarRef: RefObject<HTMLInputElement>) => { },
  setIndex: (index: number) => { },
  changeRange: (progressbarRef: RefObject<HTMLInputElement>) => { },
  changeRange2: (progressbarRef: RefObject<HTMLInputElement>) => { },
  changeRange3: (progressbarRef: RefObject<HTMLInputElement>) => { },
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
  const { set_ShowAds, list_Song, index_Song, handle_EndAds, show_Ads, change_Percent } = useAds()
  const [fist, set_fist] = useState(false)
  const urltemp = "http://localhost:8080/api/v1/send/audio/57534667333.mp3";
  const [progressbarRef, set_progressbarRef] =
    useState<RefObject<HTMLInputElement>>();
  const [progressbarRef2, set_progressbarRef2] =
    useState<RefObject<HTMLInputElement>>();
  const [progressbarRef3, set_progressbarRef3] =
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


  const changeRange3 = () => {
    if (
      audioRef.current?.currentTime != null &&
      progressbarRef3?.current?.value != null
    ) {
      audioRef.current.currentTime = Number(progressbarRef3.current?.value);
      progressbarRef3.current?.style.setProperty(
        "--seek-before-width",
        `${(Number(progressbarRef3.current.value) / duration) * 100}`
      );
      set_currentTime(Number(progressbarRef3.current?.value));
    } else {
      set_currentTime(Number(progressbarRef?.current?.value));
    }
  };


  const renderDotRange: any = () => {
    setInterval(() => {
      if (audioRef?.current?.currentTime) {
        if (progressbarRef?.current?.value != null) {
          progressbarRef.current.value = String(audioRef.current?.currentTime);
          progressbarRef.current?.style.setProperty(
            "--seek-before-width",
            `${(Number(progressbarRef.current.value) / duration) * 100}`
          );
        }

        if (progressbarRef2?.current?.value != null) {
          progressbarRef2.current.value = String(audioRef.current?.currentTime);
          progressbarRef2.current?.style.setProperty(
            "--seek-before-width",
            `${(Number(progressbarRef2.current.value) / duration) * 100}`
          );
        }

        if (progressbarRef3?.current?.value != null) {
          progressbarRef3.current.value = String(audioRef.current?.currentTime);
          progressbarRef3.current?.style.setProperty(
            "--seek-before-width",
            `${(Number(progressbarRef3.current.value) / duration) * 100}`
          );
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

  // console.log(currentList)
  const handle_EndSong = () => {
    if (show_Ads) {

    }

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
      if (audioRef?.current?.currentTime != null && audioRef?.current?.currentTime != undefined) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
      renderDotRange();
    }
  };

  const handle_shuffle = () => {
    const state = shuffle;
    const getSong = currentList[currentIndex]
    if (!state) {
      const newlist = HandleSong.shuffle(currentList)
      set_CurrentList(newlist);
      setIndex(newlist.map(e => e.Song_Id).indexOf(getSong.Song_Id))
    } else {
      set_CurrentList(playlist);
      setIndex(playlist.map(e => e.Song_Id).indexOf(getSong.Song_Id))
    }
    set_shuffle(!state);
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
    if (audioRef?.current != undefined && audioRef?.current != null) {
      if (fist) {
        audioRef.current.play();
      } else {
        set_fist(pre => !pre)
      }

    }
    renderDotRange();
  }, [currentIndex, duration]);

  useEffect(() => {
    if (playlist.length > 0) {
      set_CurrentList(playlist);
      // setIndex(0)
    } else {
      set_CurrentList([]);
    }
  }, [playlist]);

  useEffect(() => {
    if (currentList.length > 0) {

      if (URLValidate.isUrl(currentList[currentIndex]?.Song_Audio)) {
        if (currentList[currentIndex]?.Song_Audio != '' && currentList[currentIndex]?.Song_Audio != undefined) {
          Send.Audio(currentList[currentIndex].Song_Audio).then((res) =>
            set_src(URL.createObjectURL(res))
          );
        }
      } else {
        set_src(currentList[currentIndex]?.Song_Audio);
      }
      set_isPlaying(true);
      renderDotRange();
      change_Percent(currentIndex, currentList)
    }
  }, [currentList, currentIndex]);

  useEffect(() => {
    set_isPlaying(false);
    handle_Volume(volume);
  }, []);


  const TogoVolume = () => {
    if (volume > 0) {
      if (audioRef.current?.volume != undefined) {
        audioRef.current.volume = 0 / 10;
        set_volume(0)
      }
    } else {
      if (audioRef.current?.volume != undefined) {
        audioRef.current.volume = 5 / 10;
        set_volume(5)
      }
    }
  }
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
        Togo_Volume: TogoVolume,
        Set_InfoPlaylist: Set_InfoPlaylist,
        Set_RefInputRange2: Set_RefInputRange2,
        Set_RefInputRange: Set_RefInputRange,
        Set_RefInputRange3: set_progressbarRef3,
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
        changeRange3: changeRange3
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
