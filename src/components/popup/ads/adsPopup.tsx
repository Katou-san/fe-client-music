import React, { useEffect, useState } from 'react';
import './_ads.scss'
import { useAudio } from '@/contexts/providerAudio';
import Image from 'next/image';
import { useAds } from '@/contexts/providerAds';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import imgError from '../../../../public/temp.jpg'
import { partnerModel, partnerType } from '@/model/partnerModel';
import { Partner } from '@/apis/Partner';
const AdsPopup = () => {
    const { currentList, currentIndex } = useAudio()
    const { show_Ads, info_Ads } = useAds()
    const [info_Parner, set_InfoParner] = useState<partnerType>(partnerModel.init)
    const [url, set_Url] = useState('')
    const [logo, set_Logo] = useState('')

    useEffect(() => {
        if (show_Ads) {
            const song = currentList[currentIndex]
            if (URLValidate.isUrl(song?.Song_Image)) {
                Send.Image_A(song?.Song_Image)
                    .then((res) => set_Url(URL.createObjectURL(res)))
            } else {
                set_Url(song?.Song_Image)
            }
            if (info_Ads?.Partner_Id) {
                Partner.Get_Id(info_Ads.Partner_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_InfoParner(res.data)
                        }
                    })
            }

        }
    }, [currentIndex, currentList])

    useEffect(() => {
        if (show_Ads && info_Parner?.Logo != undefined && info_Parner?.Logo != '') {
            Send.Logo(info_Parner.Logo)
                .then((res) => set_Logo(URL.createObjectURL(res)))
        }
    }, [info_Parner])

    return (
        <div className='frameContentAds'>
            <header>
                <div className="titleHaeaderListPopup" >
                    Ads
                </div>
                <span></span>
                <div className="frameIconListPopup cursor_pointer">
                </div>
            </header>
            <div className="contentAds" >
                <div className="frameImage">
                    <Image src={url || imgError} alt='' width={800} height={800} />
                    <div className="contentDetail">
                        <p className='overflow__Text'>{info_Ads.Content}</p>
                        <div className="framebtnAds">
                            <div className="btnPremium">
                                Go to subscription
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="titlePartner">
                <h1>Partner info</h1>
            </div>
            <div className="framePartner">

                <div className="frameImage">
                    <Image src={logo || imgError} alt='' width={50} height={50} />
                </div>
                <div className="infoPartner">
                    <h1> {info_Parner?.Partner_Name}</h1>
                    <h2>Ads</h2>
                </div>


            </div>

        </div>
    );
}

export default AdsPopup;
