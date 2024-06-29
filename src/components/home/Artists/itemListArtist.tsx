import { PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React from 'react';
import './_listArtist.scss'
type Prop = {
    active: boolean
}
const ItemListArtist = ({ active }: Prop) => {
    const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"

    return (
        <div className={`itemListArtist ${active ? 'itemArtistActive' : 'itemArtistNotActive'}`} >
            <div className="frameImage">
                <Image alt='' src={url} width={10000} height={10000} />
                <div className="btnview">
                    view
                </div>
            </div>



            <div className="contentItemPlaylist">
                <h1 className='overflow__Text'>Name</h1>
            </div>


        </div>
    );
}

export default ItemListArtist;
