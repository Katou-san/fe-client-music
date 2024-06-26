import { PlayIcon } from '@/Icons/icon_v1';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
type Prop = {
    active: boolean
    func: () => void
    test: string
}
const ItemSilder = ({ active, func, test }: Prop) => {
    const [url, set_url] = useState("")
    useEffect(() => {
        set_url(test)
    }, [test])
    return (
        <div className={` itemSlider ${active ? "itemActive" : `itemNotActive`}`} onClick={func}>
            <Image alt='' src={url} width={10000} height={10000} />
            <div className='contentItemSilder'>
                <div className="layoutBtnPlay">
                    <PlayIcon w={30} />
                </div>
                <div className="contentBtn overflow__Text">
                    <h1 className='overflow__Text'>Song Name</h1>
                    <h3 className='overflow__Text'>for artist</h3>
                </div>
            </div>

        </div>
    );
}

export default ItemSilder;
