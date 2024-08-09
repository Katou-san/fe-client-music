'use client'
import { CheckIcon, PauseIcon, PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './_searchArist.scss'
import imgTemp from "../../../../public/temp.jpg"
import { userType } from '@/model/userModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import { useRouter } from 'next/navigation';
import { Check_Icon, Follow_Icon, Sound_Icon } from '@/Icons/icon_Figma';
import { followModel, followType } from '@/model/followModel';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { Follow } from '@/apis/Follow';
import { toast } from 'react-toastify';
import { useReload } from '@/contexts/providerReload';
import { Role } from '@/apis/Role';
import { roleModel } from '@/model/roleModel';
type Prop = {
    active: boolean
    user: userType
}
const ItemSearchArtist = ({ active, user }: Prop) => {
    const [url, set_url] = useState('')
    const routes = useRouter()
    const { set_ReFollow, re_follow } = useReload()
    const [follow, set_follow] = useState(followModel.init_res)
    const userProvider = useSelector((state: RootState) => state.auth)
    const [currentFollow, set_CurrentFollow] = useState<followType>(followModel.init)
    const [inforole, set_infoRole] = useState(roleModel.init)


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

    useEffect(() => {
        if (user.User_Id != undefined && user.User_Id != null && user.User_Id != '') {
            Promise.all([
                Follow.Get_Follow(user.User_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_follow(res.data)
                        }
                    }),
                Follow.Get_Current(user.User_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_CurrentFollow(res.data)
                        } else {
                            set_CurrentFollow(followModel.init)
                        }
                    }),
                Role.Get_Id(user.Role_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_infoRole(res.data)
                        }
                    })


            ])

        }
    }, [re_follow])

    const handleRoutes = () => {
        if (user?.User_Id != undefined && user?.User_Id != '') {
            routes.push(`profile?id=${user?.User_Id}`)

        }
    }


    const handleFollow = () => {
        if (userProvider.User_Id != undefined && userProvider.User_Id != '' && user.User_Id != '' && user.User_Id != undefined) {
            if (currentFollow.Follower != '') {
                Follow.Delete(user.User_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            toast.success(res.message)
                            set_ReFollow()
                        } else {
                            toast.error(res.message)
                        }
                    })
            } else
                Follow.Create({ Following: user.User_Id })
                    .then((res) => {
                        if (res.status == 200) {
                            toast.success(res.message)
                            set_ReFollow()
                        } else {
                            toast.error(res.message)
                        }
                    })
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
                <div className="frameName">
                    <h1 className='overflow__Text'>{user.User_Name}</h1>
                    <span>{inforole.Role_Name == 'creator' ? <Sound_Icon w={25} /> : user?.is_Premium ? <Check_Icon w={25} /> : ''} </span>
                </div>
                <h3 >{follow.Follower.length} follower </h3>
                <div className="FooterSearchArtist">

                    {currentFollow.Follower == userProvider.User_Id &&
                        <div className="frameFollow frameFolloweds" onClick={handleFollow}>
                            <><CheckIcon w={17} />
                                <h3>Followed</h3></>
                        </div>}
                    {currentFollow.Follower != userProvider.User_Id &&
                        <div className="frameFollow" onClick={handleFollow}>
                            <><Follow_Icon w={17} />
                                <h3>Follow</h3></>
                        </div>}

                </div>
            </div>

        </div>
    );
}

export default ItemSearchArtist;
