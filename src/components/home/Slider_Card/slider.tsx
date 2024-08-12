'use client'
import React, { useEffect, useState } from 'react';
import "./_silderCard.scss"
import Image from 'next/image';
import ItemSilder from '@/components/home/Slider_Card/itemSilder';
import { ArrowLeftIcon, ArrowRightIcon } from '@/Icons/icon_v1';
import { list_songType } from '@/model/songModel';

type Props = {
    arraySilder: list_songType
}
const SliderCard = ({ arraySilder = [] }: Props) => {
    const [current, set_current] = useState(0)
    const HandleCount = (type: "plus" | "redu") => {
        if (type == 'plus') {
            if (current == arraySilder.length - 1) {
                return set_current(arraySilder.length - 1)
            }
            set_current(current + 1)
        } else {
            if (current == 0) {
                return set_current(0)
            }
            set_current(current - 1)
        }
    }

    return (
        <div className='farmeSliderCard'>
            {arraySilder.length > 1 &&
                <div className="btnClick">
                    <div className="btnSlider next" onClick={() => HandleCount("redu")}><ArrowLeftIcon /></div>
                    <div className="btnSlider back" onClick={() => HandleCount("plus")}><ArrowRightIcon /></div>
                </div>}

            <div className="slider">
                {arraySilder.map((item, index) => {
                    return <ItemSilder key={index} active={current == index} func={() => set_current(index)} itemSilder={item} list={arraySilder} index={index} />

                })}
            </div>
        </div>
    );
}

export default SliderCard;
