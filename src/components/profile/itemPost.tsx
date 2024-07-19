'use Client'
import { Repost_Icon } from '@/Icons/icon_Figma';
import React, { useEffect, useState } from 'react';
import './_itemPost.scss'
import imgTemp from '../../../public/temp.jpg'
import Image from 'next/image';
import { repostType } from '@/model/repostModel';
import { userModel, userType } from '@/model/userModel';
import { SongModel, songType } from '@/model/songModel';
import { Song } from '@/apis/Song';
import { User } from '@/apis/User';
import InfoSong from '@/components/profile/infoSong';

type Props = {
    post: repostType
}
const ItemPost = ({ post }: Props) => {
    const [infoUser, set_info] = useState<userType>(userModel.init)
    const [song, set_Song] = useState<songType>(SongModel.init)
    useEffect(() => {
        if (post) {
            Promise.all([
                Song.Get_Id(post.Song_Id)
                    .then(res => {
                        if (res.status == 200) {
                            set_Song(res.data)
                        }
                    }),
                User.Get_Id(post.User_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_info(res.data)
                        }
                    })
            ])
        }
    }, [post])
    return (
        <div className="itemPost">
            <div className="headerPost">
                <div className="frameIcon">
                    <Repost_Icon color='rgb(135, 135, 135)' />
                    <h1>Reposted</h1>
                </div>
                <div className="infoUser">
                    <div className="frameImage">
                        <Image src={imgTemp} alt='' width={60} height={60} />
                    </div>
                    <div className="contentUser">
                        <div className='frameName'>
                            <h1>{infoUser.User_Name}</h1>
                            <span></span>
                        </div>
                        <h3>14/8/2024</h3>
                    </div>

                </div>
                <div className="frameInfoSong">
                    <InfoSong song={song} />
                </div>

            </div>
        </div>
    );
}

export default ItemPost;
