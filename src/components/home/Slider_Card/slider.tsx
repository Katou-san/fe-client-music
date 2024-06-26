'use client'
import React, { useEffect, useState } from 'react';
import "./_silderCard.scss"
import Image from 'next/image';
import ItemSilder from '@/components/home/Slider_Card/itemSilder';
import { ArrowLeftIcon, ArrowRightIcon } from '@/Icons/icon_v1';


const SliderCard = () => {
    const url = "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg"
    const itemSilder = [1, 2, 3, 4]
    const [current, set_current] = useState(0)
    const HandleCount = (type: "plus" | "redu") => {
        if (type == 'plus') {
            if (current == itemSilder.length - 1) {
                return set_current(itemSilder.length - 1)
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
            <div className="btnClick">
                <div className="btnSlider next" onClick={() => HandleCount("redu")}><ArrowLeftIcon /></div>
                <div className="btnSlider back" onClick={() => HandleCount("plus")}><ArrowRightIcon /></div>
            </div>
            <div className="slider">

                {itemSilder.map((item, index) => {
                    return <ItemSilder key={index} active={current == index} func={() => set_current(index)} test={url} />

                })}
            </div>
        </div>
    );
}

export default SliderCard;
