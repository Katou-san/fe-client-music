import SliderCard from '@/components/home/Slider_Card/slider';
import React from 'react';
import "./_home.scss"
import ListSong from '@/components/home/Songs/ListSong';

export default function Page() {

  return (
    <div className='ContentHomePage'>
      <div className="slider">
        <SliderCard />
      </div>
      <div className="listSong">
        <ListSong />
      </div>
      <div className="sliderCard">
        LIST PLAYLIST
      </div>
      <div className="sliderCard">
        LIST ALBUM
      </div>
      <div className="sliderCard">
        LIST ARTIST
      </div>
    </div>


  );
}
