'use client'
import React, { useEffect, useState } from 'react';
import "./_detailSong.scss"
import { Close_Icon, Play_Icon, Star_Icon } from '@/Icons/icon_Figma';
import Image from 'next/image';
import { songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import imgTemp from '../../../../public/temp.jpg'

type Props = {
    song: songType
    handle_Detail: (value: Object) => void
    detail: { index: number, show: boolean, getStar: number, cate: string }
}

const DetailSong = ({ song, detail, handle_Detail }: Props) => {
    const [urlImg, set_urlImg] = useState('')
    useEffect(() => {
        if (detail.show) {
            if (URLValidate.isUrl(song?.Song_Image)) {
                Send.Image_S(song?.Song_Image)
                    .then((res) => set_urlImg(URL.createObjectURL(res)))
            } else {
                set_urlImg(song?.Song_Image)
            }
        }
    }, [song])
    return (
        <div className={`frameDetailSong ${detail.show && 'activeFrameDetailSong'}`}>
            <div className="formDetail">
                <div className="backgroundDetail">
                    <div className="frameImage">
                        <Image alt='detail' src={urlImg || imgTemp} width={50} height={50} loading='lazy' />
                    </div>

                </div>

                <div className="headerDetail">
                    <h1>Song detail </h1>
                    <div className="frameIconListPopup cursor_pointer" onClick={() => handle_Detail({ show: false, index: 0, getStar: 0, cate: '' })}>
                        <Close_Icon w={40} color='#fff' />
                    </div>
                </div>
                <div className="bodyDetail">
                    <div className="infoSong">
                        <div className="frameImage">
                            <Image alt='detail' src={urlImg} width={50} height={50} loading='lazy' />
                        </div>
                        <div className="contentInfo">
                            <h1 className='overflow__Text'>{song?.Song_Name}</h1>
                            <h3 className='overflow__Text'>{song?.Artist}</h3>
                        </div>
                        <div className="frameIcon">
                            <Play_Icon w={60} />
                        </div>
                    </div>
                    <div className="frameStar">
                        <div className="frameIcon">
                            <Star_Icon w={30} active={true} />
                        </div>
                        <h3>{detail?.getStar}</h3>
                    </div>
                    <div className="moreInfo">
                        <div className="boxInfo">
                            <h3>Category</h3>
                            <h3 className='overflow__Text'>{detail?.cate}</h3>
                        </div>
                        <div className="boxInfo">
                            <h3>Tag</h3>
                            <h3 className='overflow__Text'>{song?.Tag}</h3>
                        </div>
                        <div className="boxInfo">
                            <h3>public</h3>
                            <h3 className={` public ${String(song?.is_Publish + "I")}`}>{String(song?.is_Publish)}</h3>
                        </div>
                        <div className="boxInfo">
                            <h3>Create_Date</h3>
                            <h3 className='overflow__Text'>{song?.Create_Date}</h3>
                        </div>
                    </div>
                </div> </div>

        </div>
    );
}

export default DetailSong;
