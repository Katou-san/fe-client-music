import SliderCard from '@/components/home/Slider_Card/slider';
import React from 'react';
import "./_home.scss"
import ListSong from '@/components/home/Songs/ListSong';
import ListPlaylist from '@/components/home/Playlists/listPlaylist';
import ListArtist from '@/components/home/Artists/listArtist';

export default function Page() {

  return (
    <div className='ContentHomePage'>
      <div className="slider">
        <SliderCard />
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
