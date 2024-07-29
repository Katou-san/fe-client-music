'use client'
import React, { useEffect, useState } from 'react';
import "./_deleteSong.scss"
import { Close_Icon } from '@/Icons/icon_Figma';
import { songType } from '@/model/songModel';
import { Song } from '@/apis/Song';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { toast } from 'react-toastify';

type Props = {
    song: songType
    handle_Delete: (value: Object) => void
    deleteSong: { index: number, show: boolean }
    onReload: () => void
}


const DeleteSong = ({ song, deleteSong, handle_Delete, onReload }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const [is_loading, set_Loading] = useState(false)
    const [checkDelete, set_CheckDelete] = useState(false)
    const Submitdelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (userProvider.is_Login && userProvider.Access_Token != '') {

            if (!is_loading) {
                let tem = true
                if (checkDelete) {
                    tem = confirm("co bai hat nay trong danh sach")
                }
                if (tem) {
                    Song.Delete(song.Song_Id)
                        .then(res => {
                            if (res.status === 200) {
                                toast.success(res.message)
                                onReload()
                            } else {
                                toast.error(res.message)
                            }
                        })
                    set_Loading(false)
                    handle_Delete({ show: false, index: 0 })
                }

            } else {
                toast.error('Is handling')
            }



        } else {
            toast.error('You need to login')
        }

    }

    useEffect(() => {
        if (song?.Song_Id != '') {
            Song.DeleteCheck(song.Song_Id)
                .then(res => {
                    console.log(res.data.Noitification)
                    if (res.status == 200) {
                        set_CheckDelete(res.data.Noitification)
                    } else {
                        set_CheckDelete(res.data.Noitification)
                    }
                })
        }
    }, [song?.Song_Id])




    return (
        <div className={`frameDeleteSong ${deleteSong.show && 'activeFrameDeleteSong'}`}>
            <div className="headerDelete">
                <h1>Delete Song </h1>
                <div className="frameIconListPopup cursor_pointer" onClick={() => handle_Delete({ show: false, index: 0 })}>
                    <Close_Icon w={40} color='#000' />
                </div>
            </div>
            <div className="bodyDelete">
                <div className="contentDelete overflow__Text">
                    <h1>Do you want delete </h1>
                    <h3>{song?.Song_Name}</h3>
                </div>
            </div>
            <div className="footerModalPlaylist">
                <div className="btnModal btnClose" onClick={() => handle_Delete({ show: false, index: 0 })}>
                    Close
                </div>
                <div className="btnModal btnAction" onClick={Submitdelete}>
                    Action
                </div>
            </div>

        </div>
    );
}

export default DeleteSong;
