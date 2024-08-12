'use client'
import React, { useEffect, useRef, useState } from 'react';
import './_findSong.scss'
import { useLayout } from '@/contexts/providerLayout';
import { validateFind } from '@/util/validate/find';
import { findType } from '@/model/findSongModal';
import { Form_Data } from '@/util/FormData/Form_Data';
import { Find } from '@/apis/Find';
import { toast } from 'react-toastify';
import { SongModel, songType } from '@/model/songModel';
import ItemListSong from '@/components/home/Songs/itemListSong';
import { LoadingSVGWatting } from '@/Icons/Loading';
const FindSong = () => {
    const itemRef = useRef<HTMLDivElement | null>(null);
    const itemRefInput = useRef<HTMLInputElement | null>(null);
    const { is_find, setShowFind } = useLayout()
    const [valueFind, set_valueFind] = useState<findType>({ Song_Find: null })
    const [is_Loading, set_Load] = useState(false)
    const [resultSong, set_resultSong] = useState<songType>(SongModel.init)

    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                setShowFind(false);
                set_valueFind({ Song_Find: '' })
                set_resultSong(SongModel.init)
                if (itemRefInput.current) {
                    itemRefInput.current.value = ''
                }
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const checkError = validateFind(valueFind)
        if (!checkError.status && !is_Loading) {
            set_Load(true)
            const formData = Form_Data(valueFind)
            Find.Find_audio(formData)
                .then((res) => {
                    if (res.status == 200) {
                        set_resultSong(res.data.Song)
                        set_Load(false)
                    } else {
                        set_Load(false)
                        set_resultSong(SongModel.init)
                    }
                })
        } else {
            let Array_Key = Object.keys(checkError.Error);
            toast.error(checkError.Error[Array_Key[0]]);
            set_Load(false)
        }
    }


    return (
        <div className={`frameFindSong ${is_find && 'activeFrameFindSong'}`} ref={itemRef}>
            <h1>Find Song </h1>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="findSongInput">
                    <div className="contentFind">
                        {is_Loading && <div className='frameIcon'>
                            <LoadingSVGWatting w={70} color='#000' />
                        </div>}
                        {!is_Loading &&
                            <h1 className=''>{`${!valueFind.Song_Find && itemRefInput?.current?.files?.length == 0 ? 'Choose audio' : itemRefInput?.current?.files ? itemRefInput.current?.files[0].name : 'Has Song'}`}</h1>}
                    </div>
                </label>

                <input type="file" name="findSongInput" id="findSongInput" accept='audio/*' className='none' ref={itemRefInput}
                    onChange={(e) => {
                        set_valueFind({ ...valueFind, Song_Find: e.target?.files ? e.target.files[0] : null })
                    }} />
                <div className="footerModalPlaylist">
                    <div className="btnModal btnClose" onClick={() => {
                        setShowFind(false);
                        set_valueFind({ Song_Find: null })
                        if (itemRefInput.current) {
                            itemRefInput.current.value = ''
                        }
                        set_resultSong(SongModel.init)
                    }
                    }>
                        Close
                    </div>
                    <button type="submit" className="btnModal btnAction" >
                        Action
                    </button>
                </div>

            </form>
            <div className="listResult">
                {resultSong?.Song_Id != '' && <ItemListSong active={false} itemSong={resultSong} list={[resultSong]} index={0} />}
                {resultSong?.Song_Id == '' && <h1>Not found</h1>}
            </div>
        </div>
    );
}

export default FindSong;
