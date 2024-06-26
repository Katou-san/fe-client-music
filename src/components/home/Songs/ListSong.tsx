import React from 'react';
import "./_listSong.scss"
import ItemListSong from '@/components/home/Songs/itemListSong';
import { ArrowLeftIcon, ArrowRightIcon } from '@/Icons/icon_v1';
const ListSong = () => {

    const arrayTemp = ['a', 'b', 'c', 'd', 'e'];
    return (
        <>
            <div className="titleHome">
                <h1>List song</h1>
                <div className="btnListSong">
                    <div className="back btnClick"><ArrowLeftIcon /></div>
                    <div className="next btnClick"><ArrowRightIcon /></div>
                </div>
            </div>
            <div className="frameListSong">

                {arrayTemp.map((item, index) => {
                    return <ItemListSong key={index} active={index == 0} />

                })}
            </div></>
    );
}

export default ListSong;
