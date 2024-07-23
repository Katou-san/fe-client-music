'use client'
import { PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import imgTemp from "../../../../public/temp.jpg"
import './_listArtist.scss'
import { userType } from '@/model/userModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import { useRouter } from 'next/navigation';
type Prop = {
    active: boolean
    user: userType
}
const ItemListArtist = ({ active, user }: Prop) => {
    const [url, set_url] = useState('')
    const routes = useRouter()
    useEffect(() => {
        if (user?.Avatar != '' && user?.Avatar != undefined) {
            if (URLValidate.isUrl(user.Avatar)) {
                Send.Avatar(user.Avatar)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(user.Avatar)
            }

        }

    }, [user])

    const handleRoutes = () => {
        if (user?.User_Id != undefined && user?.User_Id != '') {
            routes.push(`profile?id=${user?.User_Id}`)

        }
    }
    return (
        <div className={`itemListArtist ${active ? 'itemArtistActive' : 'itemArtistNotActive'}`} >
            <div className="frameImage">
                <Image alt='' src={url || imgTemp} width={200} height={200} loading='lazy' />
                <div className="btnview" onClick={handleRoutes}>
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
