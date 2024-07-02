import { Send } from '@/apis/Send';
import { useAudio } from '@/contexts/providerAudio';
import { LineSoundAnimation } from '@/Icons/cusIcons/lineSound';
import { Favorite_Icon } from '@/Icons/icon_Figma';
import { AddIcon } from '@/Icons/icon_v1';
import { songType } from '@/model/songModel';
import { URLValidate } from '@/util/validate/url';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
    item: songType,
    index: number,
    active: boolean
}
const ItemListPopup = ({ item, index, active }: Props) => {
    const { setIndex } = useAudio()
    const [url, set_url] = useState('')
    useEffect(() => {
        if (URLValidate.isUrl(item.Song_Image)) {
            Send.Image_S(item.Song_Image)
                .then((res) => set_url(URL.createObjectURL(res)))
        } else {
            set_url(item.Song_Image)
        }
    }, [item, index])

    return (
        <div className={`ItemListPopup cursor_pointer ${active && "isActiveItemPopup"}`}>
            <div className="indexListPopup" onClick={() => setIndex(index)}>
                {active && <LineSoundAnimation />}
                {!active && index + 1}
            </div>
            <div className="frameImagePopup" onClick={() => setIndex(index)}>
                <Image src={url} width={1000} height={1000} alt='' />
            </div>
            <div className="infomationItemPopup" onClick={() => setIndex(index)}>
                <h1>Name</h1>
                <h3>by artist</h3>
            </div>
            <div className="frameIconItemPopup">
                <div className="frameIcon">
                    <Favorite_Icon active={false} />
                </div>
                <div className="frameIcon addIcon">
                    <AddIcon />
                </div>

            </div>
        </div>
    );
}

export default ItemListPopup;
