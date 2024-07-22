import { PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React from 'react';
import imgTemp from "../../../../public/temp.jpg"
import './_listArtist.scss'
import { userType } from '@/model/userModel';
type Prop = {
    active: boolean
    user: userType
}
const ItemListArtist = ({ active, user }: Prop) => {
    const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"

    return (
        <div className={`itemListArtist ${active ? 'itemArtistActive' : 'itemArtistNotActive'}`} >
            <div className="frameImage">
                <Image alt='' src={url || imgTemp} width={200} height={200} loading='lazy' />
                <div className="btnview">
                    view
                </div>
            </div>



            <div className="contentItemPlaylist">
                <h1 className='overflow__Text'>{user.User_Name}</h1>
            </div>


        </div>
    );
}

export default ItemListArtist;
