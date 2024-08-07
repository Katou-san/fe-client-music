import { Send } from '@/apis/Send';
import { useAudio } from '@/contexts/providerAudio';
import { useLayout } from '@/contexts/providerLayout';
import { PlayIcon } from '@/Icons/icon_v1';
import { list_songType, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import imgTemp from "../../../../public/temp.jpg"
import { useAds } from '@/contexts/providerAds';
type Prop = {
    active: boolean
    func: () => void
    itemSilder: songType
    test?: string
    list: list_songType
    index: number
}
const ItemSilder = ({ active, func, itemSilder, list, index }: Prop) => {
    const { onAds, set_NextList, set_NextSongIndex, set_PercentAds } = useAds()
    const { setList, setIndex, currentList } = useAudio()
    const { is_Popup } = useLayout()
    const [url, set_url] = useState("")
    useEffect(() => {
        if (itemSilder?.Song_Image != undefined) {
            if (URLValidate.isUrl(itemSilder.Song_Image)) {
                Send.Image_S(itemSilder.Song_Image)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(itemSilder.Song_Image)
            }
        }

    }, [itemSilder.Song_Image])
    return (
        <div className={` itemSlider ${active ? "itemActive" : `itemNotActive`} ${is_Popup && 'isPopup'}`} >
            <Image alt='' src={url || imgTemp} width={800} height={500} loading='lazy' />
            <div className='contentItemSilder' onClick={() => {
                if (onAds) {
                    set_NextSongIndex(index)
                    set_NextList(list)
                } else {
                    setIndex(index);
                    setList(list)
                    set_PercentAds(0)
                }
            }}>
                <div className="layoutBtnPlay">
                    <PlayIcon w={30} />
                </div>
                <div className="contentBtn overflow__Text" >
                    <h1 className='overflow__Text'>{itemSilder?.Song_Name}</h1>
                    <h3 className='overflow__Text'>for {itemSilder?.Artist_Name}</h3>
                </div>
            </div>

        </div>
    );
}

export default ItemSilder;
