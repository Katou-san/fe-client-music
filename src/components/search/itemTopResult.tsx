'use client'
import React, { useEffect, useState } from 'react';
import './_searchItem.scss'
import { list_songType, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import imgtemp from '../../../public/temp.jpg'
import Image from 'next/image';
import { Pause_Icon, Play_Icon, Star_Icon } from '@/Icons/icon_Figma';
import { AddIcon } from '@/Icons/icon_v1';
import { userModel, userType } from '@/model/userModel';
import { User } from '@/apis/User';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { useAudio } from '@/contexts/providerAudio';
import { create_likeType, likeModel, list_likeType } from '@/model/likeModel';
import { Like } from '@/apis/Like';
import { playlistType } from '@/model/playlistModel';
import { Track } from '@/apis/Track';
import { toast } from 'react-toastify';
import PlaylistModalDropDown from '@/components/customs/modal/playlistModal';
import { useAds } from '@/contexts/providerAds';

type Props = {
    song: songType;
    list: list_songType;
    index: number;
    info_Playlist: playlistType;
}

const ItemTopResult = ({ song, list, index, info_Playlist }: Props) => {
    const [url, set_url] = useState('')
    const [infoUser, set_Info] = useState<userType>(userModel.init)
    const { onAds, set_NextList, set_NextSongIndex, set_PercentAds } = useAds()


    const userProvider = useSelector((State: RootState) => State.auth)
    const infoProvider = useSelector((State: RootState) => State.info)
    const [drop_Down, set_Drop] = useState(false)
    const { setList, setIndex, Set_InfoPlaylist, currentList, currentIndex, is_Playing } =
        useAudio();
    const [listLike, set_listLike] = useState<list_likeType>([]);
    const [stateLike, set_StateLike] = useState<create_likeType>(
        likeModel.init_create
    );


    useEffect(() => {
        if (song?.Song_Id != '' && song?.User_Id != undefined && song?.Song_Image != undefined) {
            Promise.all([
                Like.Get_Current(song.Song_Id, 0).then((res) => {
                    if (res.status == 200) {
                        set_StateLike(res.data)
                    }
                }),
                Like.Get_Song(song.Song_Id).then((res) => set_listLike(res.data))
            ])

            if (URLValidate.isUrl(song.Song_Image)) {
                Send.Image_S(song.Song_Image)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(song?.Song_Image)
            }

            User.Get_Id(song.User_Id).then((res) => res.status == 200 && set_Info(res.data))
        }

    }, [song]);


    const Get_Like = () => {
        Like.Get_Song(song.Song_Id).then((res) => {
            set_listLike(res.data);
        })
        Like.Get_Current(song.Song_Id, 0).then((res) => {
            if (res.status == 200) {
                set_StateLike(res.data)
            }
        })
    }

    const Handle_Play = () => {
        if (onAds) {
            if (list.length > 0 && info_Playlist != null) {
                if (currentList == list) {
                    set_NextSongIndex(index);
                } else {
                    set_NextList(list);
                    set_NextSongIndex(index);
                    Set_InfoPlaylist(info_Playlist);
                }
            }

        } else {
            if (list.length > 0 && info_Playlist != null) {
                if (currentList == list) {
                    setIndex(index);
                } else {
                    Set_InfoPlaylist(info_Playlist);
                    setList(list);
                    setIndex(index);
                }
            }
        };
    }
    const handleLike = () => {
        if (userProvider.Access_Token != "" && userProvider.is_Login == true && infoProvider.Like != '') {
            if (song.Song_Id != null && song.Song_Id != '') {
                if (stateLike.State == 1) {
                    Like.Togo_Create_Update({ ...stateLike, Topic_Id: song.Song_Id, State: 0, Type: 0 })
                        .then(res => {
                            Get_Like()
                            Track.Delete(infoProvider.Like, song.Song_Id)
                        })
                } else {
                    Like.Togo_Create_Update({ ...stateLike, Topic_Id: song.Song_Id, State: 1, Type: 0 })
                        .then(res => {
                            Get_Like()
                            Track.Create({ Playlist_Id: infoProvider.Like, Song_Id: song.Song_Id })
                        })
                }
            }
        } else {
            toast.error("You need login");
        }
    };

    return (
        <div className="topResult">
            <div className="headerTopResult">
                <div className="frameImg">
                    <Image src={url || imgtemp} alt='' width={20} height={20} loading='lazy' />
                </div>
                <div className="infoResult">
                    <h1 className='overflow__Text'>{song?.Song_Name || ''}</h1>
                    <h3 className='overflow__Text'>Artist: {song?.Artist_Name || ''}</h3>
                </div>
            </div>
            <div className="contentTopResult">
                <div className={`frameLike cursor_pointer starIcon  ${stateLike.State == 1
                    ? "starAcive"
                    : ""
                    }`} onClick={handleLike}>
                    <Star_Icon />
                    <h3>{listLike.length}</h3>
                </div>
                <div className="frameAdd cursor_pointer" onClick={() => set_Drop(true)}>
                    <AddIcon w={20} />
                </div>
            </div>
            <div className="frameInfoUser cursor_pointer">
                Upload by: {infoUser?.User_Name}
            </div>
            <div className="btnPlayResult cursor_pointer" onClick={Handle_Play}>
                {is_Playing && currentList[currentIndex]?.Song_Id == song?.Song_Id ? <Pause_Icon w={50} /> : <Play_Icon w={60} />}

            </div>
            <PlaylistModalDropDown set_Drop={() => set_Drop(false)} drop_Down={drop_Down} song={song} style={{ top: '50%', left: '50%' }} />
        </div>
    );
}

export default ItemTopResult;