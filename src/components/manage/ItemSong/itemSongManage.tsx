'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './_itemSong.scss'
import { list_songType, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import { Edit_Icon, Star_Icon, Trash_Icon, View_Icon } from '@/Icons/icon_Figma';
import { Like } from '@/apis/Like';
import { list_likeType } from '@/model/likeModel';
import { Category } from '@/apis/Category';
import { cateModel, cateType } from '@/model/cateModel';
import { AddSongIcon } from '@/Icons/icon_v1';
import ModalDropdownPlaylist from '@/components/manage/modalPlaylist/modalPlaylist';
import { useAds } from '@/contexts/providerAds';
import { useAudio } from '@/contexts/providerAudio';
import { LineSoundAnimation } from '@/Icons/cusIcons/lineSound';

type Props = {
    song: songType
    index: number
    listSong: list_songType
    handle_Detail: (value: Object) => void
    handle_Delete: (value: Object) => void
    handle_Update: (value: Object) => void
}
const ItemSongManage = ({ song, index, handle_Detail, handle_Delete, handle_Update, listSong }: Props) => {
    const [url, set_Url] = useState('')
    const [listLike, set_Like] = useState<list_likeType>([])
    const [cate, set_Cate] = useState<cateType>(cateModel.init)
    const [drop_Down, set_DropDown] = useState(false)
    const { onAds, set_NextList, set_NextSongIndex, set_PercentAds } = useAds()

    const {
        is_Playing,
        currentIndex,
        currentList,
        setList,
        setIndex,
        setPlay,
        Set_InfoPlaylist,
    } = useAudio();
    useEffect(() => {
        if (URLValidate.isUrl(song.Song_Image)) {
            Send.Image_S(song.Song_Image)
                .then((res) => set_Url(URL.createObjectURL(res)))
        } else {
            set_Url(song.Song_Image)
        }
    }, [song.Song_Image])

    useEffect(() => {
        Category.Get_Id(song.Category_Id).then((res) => {
            if (res.status == 200) {
                set_Cate(res.data)
            }
        }
        )
    }, [song.Category_Id])

    useEffect(() => {
        Like.Get_Song(song.Song_Id)
            .then(res => set_Like(res.data))
    }, [song])



    const handleClick = () => {
        if (onAds) {
            if (currentList[currentIndex]?.Song_Id != song?.Song_Id) {
                set_NextList(listSong);
                set_NextSongIndex(index);
                Set_InfoPlaylist(null);
            } else {
                setPlay();
            }

        } else {
            if (currentList[currentIndex]?.Song_Id != song?.Song_Id) {
                setIndex(index);
                setList(listSong)
                set_PercentAds(0)
                Set_InfoPlaylist(null);
            } else {
                setPlay();
            }
        }
    };


    return (
        <div className="itemTable">
            <div className="indexTable" onClick={handleClick}>
                {currentList[currentIndex]?.Song_Id == song.Song_Id && (
                    <LineSoundAnimation />
                )}
                {currentList[currentIndex]?.Song_Id != song.Song_Id && index + 1}
            </div>
            <div className="indexInfo" onClick={handleClick}>
                <div className="frameImg">
                    <Image src={url} alt='0' width={50} height={50} loading='lazy' />
                </div>
                <div className="infoSong overflow__Text">
                    <h1 className='overflow__Text'>{song.Song_Name}</h1>
                    <h3 className='overflow__Text'>{song?.Artist_Name}</h3>
                </div>
            </div>
            <div className="frameCate" onClick={handleClick}>
                {cate?.Category_Name}
            </div>
            <div className="indexState" onClick={handleClick}>
                <h3 className={` public ${String(song?.is_Publish + "I")}`}>{String(song.is_Publish)}</h3>

            </div>
            <div className="frameLike" >
                <div className="infoLike" >
                    <Star_Icon w={30} />
                    <h3>{listLike.length}</h3>
                </div>
            </div>
            <div>
                {new Date(song.Create_Date).toLocaleDateString()}
            </div>

            <div className="frameBtnhHandle">
                <div className="frameIcon" onClick={() => {
                    handle_Detail({ show: true, index: index, getStar: listLike.length, cate: cate.Category_Name })
                }}>
                    <View_Icon />
                </div>
                <div className="frameIcon" onClick={() => {
                    handle_Update({ show: true, index: index, cate: cate.Category_Name })
                }}>
                    <Edit_Icon />
                </div>
                <div className="frameIcon" onClick={() => {
                    handle_Delete({ show: true, index: index })
                }}>
                    <Trash_Icon color='#f54281' />
                </div>
                <div className="frameIcon" onClick={() => {
                    set_DropDown(true)
                }}>
                    <AddSongIcon />
                </div>

                <ModalDropdownPlaylist drop_Down={drop_Down} set_Drop={() => set_DropDown(false)} song={song} style={{ left: '0%' }} />
            </div>
        </div>
    );
}

export default ItemSongManage;
