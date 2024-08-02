'use Client'
import { Comment_Icon, Follow_Icon, Repost_Icon, Star_Icon } from '@/Icons/icon_Figma';
import React, { useEffect, useState } from 'react';
import './_itemPost.scss'
import imgTemp from '../../../public/temp.jpg'
import Image from 'next/image';
import { list_repostType, repostModel, repostType } from '@/model/repostModel';
import { userModel, userType } from '@/model/userModel';
import { SongModel, songType } from '@/model/songModel';
import { Song } from '@/apis/Song';
import { User } from '@/apis/User';
import InfoSong from '@/components/profile/infoSong';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { likeModel, likeType, list_likeType } from '@/model/likeModel';
import { list_commentType } from '@/model/commentModel';
import { Comment } from '@/apis/Comment';
import { Repost } from '@/apis/Repost';
import { Like } from '@/apis/Like';
import { CheckIcon, MoreIcon } from '@/Icons/icon_v1';
import MoreRepostDropDown from '@/components/customs/more/moreRepost/moreRepost';
import { Track } from '@/apis/Track';
import { toast } from 'react-toastify';
import { useReload } from '@/contexts/providerReload';
import { Follow } from '@/apis/Follow';
import { followModel, followType } from '@/model/followModel';

type Props = {
    post: repostType
}
const ItemPost = ({ post }: Props) => {
    const { set_ReRepost, re_follow, set_ReFollow } = useReload()
    const userProvider = useSelector((state: RootState) => state.auth)
    const infoProvider = useSelector((state: RootState) => state.info)
    const [infoUser, set_info] = useState<userType>(userModel.init)
    const [song, set_Song] = useState<songType>(SongModel.init)
    const [listLike, set_ListLike] = useState<list_likeType>([])
    const [stateLike, set_StateLike] = useState<likeType>(likeModel.init)
    const [stateRepost, set_StateRepost] = useState<repostType>(repostModel.init)
    const [listCommnet, set_ListCommnet] = useState<list_commentType>([])
    const [listRepost, set_ListRepost] = useState<list_repostType>([])
    const [drop, set_Drop] = useState(false)
    const [url, set_url] = useState('')
    const [currentFollow, set_CurrentFollow] = useState<followType>(followModel.init)
    useEffect(() => {
        if (post) {
            Promise.all([
                Song.Get_Id(post.Song_Id)
                    .then(res => {
                        if (res.status == 200) {
                            set_Song(res.data)
                        }
                    })

            ])
        }
    }, [post])

    useEffect(() => {
        if (song?.User_Id != '' && song?.User_Id != undefined) {
            User.Get_Id(song?.User_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_info(res.data)
                    }
                })
        }
    }, [song])


    useEffect(() => {
        Promise.all([
            Comment.Get_SongId(post.Song_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_ListCommnet(res.data)
                    }
                }),
            Repost.Get_Song(post.Song_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_ListRepost(res.data)
                    }
                }),
            Like.Get_Song(post.Song_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_ListLike(res.data)
                    }
                }),
            Like.Get_Current(post.Song_Id, 0)
                .then((res) => {
                    if (res.status == 200) {
                        set_StateLike(res.data)
                    }
                }),


        ])

        if (userProvider.User_Id != '') {
            Repost.Get_Current(userProvider.User_Id, post.Song_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_StateRepost(res.data)
                    }
                })
        }
    }, [post])

    useEffect(() => {
        if (infoUser?.Avatar != '' && infoUser?.Avatar != undefined) {
            if (URLValidate.isUrl(infoUser.Avatar)) {
                Send.Avatar(infoUser.Avatar)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(infoUser.Avatar)
            }
        }
    }, [infoUser, post])

    useEffect(() => {
        if (infoUser?.User_Id != undefined && infoUser?.User_Id != null && infoUser?.User_Id != '') {
            Follow.Get_Current(infoUser.User_Id)
                .then((res) => {
                    if (res.status == 200) {
                        set_CurrentFollow(res.data)
                    } else {
                        set_CurrentFollow(followModel.init)
                    }
                })
        }

    }, [infoUser, re_follow])

    const handleFollow = () => {
        if (userProvider.User_Id != undefined && userProvider.User_Id != '' && infoUser.User_Id != '' && infoUser.User_Id != undefined) {
            if (currentFollow.Follower != '') {
                Follow.Delete(infoUser.User_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            toast.success(res.message)
                            set_ReFollow()
                        } else {
                            toast.error(res.message)
                        }
                    })
            } else
                Follow.Create({ Following: infoUser.User_Id })
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

    const handleLike = () => {
        if (userProvider.Access_Token != "" && userProvider.is_Login && infoProvider.Like != '') {
            if (post.Song_Id != null && post.Song_Id != '') {
                if (stateLike.State == 1) {
                    Like.Togo_Create_Update({ ...stateLike, Topic_Id: post.Song_Id, State: 0, Type: 0 })
                        .then(res => {
                            Get_Like()
                            Track.Delete(infoProvider.Like, post.Song_Id)
                        })
                } else {
                    Like.Togo_Create_Update({ ...stateLike, Topic_Id: post.Song_Id, State: 1, Type: 0 })
                        .then(res => {
                            Get_Like()
                            Track.Create({ Playlist_Id: infoProvider.Like, Song_Id: post.Song_Id })
                        })
                }
            }

        } else {
            toast.error("You need login");
        }
    }

    const Get_Like = () => {
        Like.Get_Current(post.Song_Id, 0).then((res) => {
            if (res.status == 200) {
                set_StateLike(res.data)
            }
        })
        Like.Get_Song(post.Song_Id)
            .then((res) => {
                if (res.status == 200) {
                    set_ListLike(res.data)
                }
            })
    }

    return (
        <div className="itemPost">
            <div className="frameInfoPost">
                <div className="headerPost">
                    <div className="frameIcon">
                        <Repost_Icon color='rgb(135, 135, 135)' />
                        <h1>Reposted</h1>
                    </div>
                    <div className="infoUser">
                        <div className="frameImage">
                            <Image src={url || imgTemp} alt='' width={60} height={60} />
                        </div>
                        <div className="contentUser">
                            <div className='frameName'>
                                <h1 className='overflow__Text'>{infoUser?.User_Name || 'unknown'}</h1>
                                <span></span>
                            </div>
                            <h3>{new Date(post?.Post_Time).toLocaleDateString()}</h3>
                        </div>
                        <div className="frameFollow">
                            {userProvider.User_Id != infoUser?.User_Id && !!song &&
                                <>
                                    {currentFollow.Follower == userProvider.User_Id &&
                                        <div className="frameIconFolow frameFollowed" onClick={handleFollow}>
                                            <><CheckIcon w={17} />
                                                <h1>Followed</h1></>
                                        </div>}
                                    {currentFollow.Follower != userProvider.User_Id &&
                                        <div className="frameIconFolow" onClick={handleFollow}>
                                            <><Follow_Icon w={17} />
                                                <h1>Follow</h1></>
                                        </div>}</>

                            }
                            {userProvider.User_Id == post.User_Id &&
                                <div className="frameIconMore" onClick={() => set_Drop(true)}>
                                    <MoreIcon color={"#e0e0e0"} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="frameInfoSong">
                    <InfoSong song={song} />
                </div>
                <div className="footerPost">
                    <div className="framelistIcon">
                        <div className={`frameIcon iconstar cursor_pointer ${stateLike.State == 1 && 'activeIconStar'}`} onClick={handleLike}>
                            <Star_Icon />
                            <h2>{listLike.length}</h2>
                        </div>
                        <div className={`frameIcon iconRepost cursor_pointer ${stateRepost.Repost_Id != '' && 'activeIconRepost'}`}>
                            <Repost_Icon />
                            <h2>{listRepost.length}</h2>
                        </div>
                        <div className="frameIcon iconComment cursor_pointer">
                            <Comment_Icon />
                            <h2>{listCommnet.length}</h2>
                        </div>
                    </div>
                </div>
                <MoreRepostDropDown drop_Down={drop} set_Drop={() => set_Drop(false)} repost={post} onReload={set_ReRepost}
                    style={{ top: "10%", left: '60%' }}
                    type={1}
                />
            </div>

        </div>
    );
}

export default ItemPost;
