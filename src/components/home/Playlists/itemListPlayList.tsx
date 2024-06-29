import { PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React from 'react';
type Prop = {
    active: boolean
}
const ItemListPlayList = ({ active }: Prop) => {
    const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"

    return (
        <div className={`itemListPlaylist ${active ? 'itemActive' : 'itemNotActive'}`} >
            <Image alt='' src={url} width={10000} height={10000} />
            <div className="contentItemPlaylist">
                <h1 className='overflow__Text'>Name</h1>
                <h3 className='overflow__Text'>for artist</h3>
            </div>
            <div className="frameBtnListPlaylist">
                <div className="frameIcon">
                    {active ? <PauseIcon color='#383838' w={27} /> : <PlayIcon color='#383838' />}
                </div>
            </div>

        </div>
    );
}

export default ItemListPlayList;
