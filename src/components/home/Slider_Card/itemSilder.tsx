import { Send } from '@/apis/Send';
import { useAudio } from '@/contexts/providerAudio';
import { useLayout } from '@/contexts/providerLayout';
import { PlayIcon } from '@/Icons/icon_v1';
import { list_songType, songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
type Prop = {
    active: boolean
    func: () => void
    itemSilder: songType
    test?: string
    list: list_songType
    index: number
}
const ItemSilder = ({ active, func, itemSilder, list, index }: Prop) => {
    const { setList, setIndex } = useAudio()
    const { is_Popup } = useLayout()
    const [url, set_url] = useState("")
    useEffect(() => {
        if (URLValidate.isUrl(itemSilder.Song_Image)) {
            Send.Image_S(itemSilder.Song_Image)
                .then((res) => set_url(URL.createObjectURL(res)))
        } else {
            set_url(itemSilder.Song_Image)
        }


    }, [itemSilder])
    return (
        <div className={` itemSlider ${active ? "itemActive" : `itemNotActive`} ${is_Popup && 'isPopup'}`} >
            <Image alt='' src={url} width={10000} height={10000} />
            <div className='contentItemSilder' onClick={() => {
                setList([...list])
                setIndex(index)
            }}>
                <div className="layoutBtnPlay">
                    <PlayIcon w={30} />
                </div>
                <div className="contentBtn overflow__Text" >
                    <h1 className='overflow__Text'>{itemSilder.Song_Name}</h1>
                    <h3 className='overflow__Text'>for artist</h3>
                </div>
            </div>

        </div>
    );
}

export default ItemSilder;