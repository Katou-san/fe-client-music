'use client'
import SliderCard from '@/components/home/Slider_Card/slider';
import React, { useEffect, useState } from 'react';
import "./_home.scss"
import ListSong from '@/components/home/Songs/ListSong';
import ListPlaylist from '@/components/home/Playlists/listPlaylist';
import ListArtist from '@/components/home/Artists/listArtist';
import { list_songType, songType } from '@/model/songModel';
import { Propose } from '@/apis/Trending';
import { list_playlistType } from '@/model/playlistModel';
import { list_userType } from '@/model/userModel';

export default function Page() {
  const [silder, set_Slider] = useState<list_songType>([])
  const [listSong, set_ListSong] = useState<list_songType>([])
  const [listPlaylist, set_ListPlaylist] = useState<list_playlistType>([])
  const [listArtist, set_ListArtist] = useState<list_userType>([])
  useEffect(() => {
    Promise.all([
      Propose.Get_Silder().then((res) => set_Slider(res.data as list_songType))
    ])

  }, [])
  return (
    <div className='ContentHomePage'>
      <div className="slider">
        <SliderCard arraySilder={silder} />
      </div>
      <div className="listSong">
        <ListSong />
      </div>
      <div className="listPlaylist">
        <ListPlaylist />
      </div>
      <div className="listPlaylist">
        <ListPlaylist />
      </div>
      <div className="listArtist">
        <ListArtist />
      </div>
    </div>


  );
}
