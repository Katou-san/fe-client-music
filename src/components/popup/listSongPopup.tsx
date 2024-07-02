import React from 'react';
import './_listSongPopup.scss'
import { Close_Icon, Favorite_Icon } from '@/Icons/icon_Figma';
import Image from 'next/image';
import { useLayout } from '@/contexts/providerLayout';
import { AddIcon } from '@/Icons/icon_v1';
import ItemListPopup from '@/components/popup/itemList';
import { useAudio } from '@/contexts/providerAudio';
import { songType } from '@/model/songModel';
const ListSongPopup = () => {
    const { setShowListPopup } = useLayout()
    const { currentIndex, currentList } = useAudio()

    return (
        <div className='framelist'>
            <header>
                <div className="titleHaeaderListPopup">
                    Current playlist
                </div>
                <span></span>
                <div className="frameIconListPopup cursor_pointer" onClick={setShowListPopup}>
                    <Close_Icon w={40} color='#000' />
                </div>
            </header>
            <div className="listItemPopup">
                {currentList.map((item: songType, index) => {
                    return (
                        <ItemListPopup key={index} active={currentIndex == index} index={index} item={item} />
                    )
                })}
            </div>

        </div>
    );
}

export default ListSongPopup;
