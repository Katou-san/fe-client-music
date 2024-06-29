"use client"
import React, { useRef } from 'react';
import './_listPlaylist.scss'
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import ItemListPlayList from '@/components/home/Playlists/itemListPlayList';

const ListPlaylist = () => {
    const listRef = useRef<HTMLDivElement>(null)
    const arrayTemp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    const handeNext = (type: 'next' | 'prev') => {
        if (type == 'next') {
            if (listRef.current?.scrollLeft) {
                listRef.current.scrollLeft += 190
            }
        }
        if (type == 'prev') {
            if (listRef.current?.scrollLeft) {
                listRef.current.scrollLeft -= 190
            }
        }
    }
    return (
        <>
            <div className="titleHome">
                <h1>List playlist</h1>
                <div className="btnListPlaylist">
                    <div className="back btnClick" onClick={() => handeNext('prev')}><ArrowLeftIcon /></div>
                    <div className="next btnClick" onClick={() => handeNext('next')}><ArrowRightIcon /></div>
                </div>
            </div>
            <div className="frameListPlaylist" ref={listRef}>

                {arrayTemp.map((item, index) => {
                    return <ItemListPlayList key={index} active={index == 0} />

                })}
            </div></>
    );
}

export default ListPlaylist;
