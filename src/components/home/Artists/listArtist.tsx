"use client"
import React, { useRef } from 'react';
import './_listArtist.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '@/Icons/icon_v1';
import ItemListArtist from '@/components/home/Artists/itemListArtist';
import { list_userType } from '@/model/userModel';

type Props = {
    arrayArtist: list_userType
}

const ListArtist = ({ arrayArtist }: Props) => {
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
                <h1>List artist</h1>
                <div className="btnListPlaylist">
                    <div className="back btnClick" onClick={() => handeNext('prev')}><ArrowLeftIcon /></div>
                    <div className="next btnClick" onClick={() => handeNext('next')}><ArrowRightIcon /></div>
                </div>
            </div>
            <div className="frameArtistPlaylist" ref={listRef}>

                {arrayArtist.map((item, index) => {
                    return <ItemListArtist key={index} active={index == 0} user={item} />

                })}
            </div></>
    );
}

export default ListArtist;
