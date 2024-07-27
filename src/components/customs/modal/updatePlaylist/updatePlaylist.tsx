"use client";
import React, { useEffect, useState } from "react";
import { albumModel, playlistModel, playlistType, update_Playlist } from "@/model/playlistModel";
import './_updatePlaylist.scss'
import Image from "next/image";
import imgTemp from '../../../../../public/temp.jpg'
import { Close_Icon } from "@/Icons/icon_Figma";
import { playlistValidate } from "@/util/validate/playlistReq";
import { Form_Data } from "@/util/FormData/Form_Data";
import { Playlist } from "@/apis/Playlist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Send } from "@/apis/Send";
type Prop = {
    playlist: playlistType
    drop_down: boolean
    on_DropDown: () => void
    on_Reload: () => void
};

const UpdatePlaylistModal = ({ playlist, drop_down, on_DropDown, on_Reload }: Prop) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const [valuePlaylist, set_ValuePlaylist] = useState<playlistType>(playlist)
    const [change, set_Change] = useState<update_Playlist>(playlistModel.init_update)
    const [urlImg, Set_urlImg] = useState('')
    const [urlThumnail, Set_urlThum] = useState('')

    useEffect(() => {
        if (drop_down) {
            if (playlist?.Playlist_Id != '' && playlist?.Image != '' && playlist?.Thumbnail != '') {
                Promise.all([
                    Send.Image_P(playlist.Image).then((res) => {
                        Set_urlImg(URL.createObjectURL(res))
                    }),
                    Send.Thumnail_P(playlist.Thumbnail).then((res) => {
                        Set_urlThum(URL.createObjectURL(res))
                    })
                ])
            }
            set_ValuePlaylist(playlist)
        }


    }, [playlist, drop_down])


    const SubmitForm = (e: any) => {
        e.preventDefault();
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            const Error_Check = playlistValidate.update(change)
            if (!Error_Check.status) {
                const formdata = Form_Data({ ...change });
                Playlist.Update(playlist.Playlist_Id, formdata).then((res) => {
                    if (res.status == 200) {
                        on_DropDown()
                        on_Reload()
                        set_ValuePlaylist(playlistModel.init)
                    } else {
                        toast.error(res.message);
                    }
                })

            } else {
                let Array_Key = Object.keys(Error_Check.Error);
                toast.error(Error_Check.Error[Array_Key[0]]);
            }
        }

    };
    return (
        <div className={`formAddAlbum  ${drop_down && 'activeformAddAlbum'}`}>

            <form
                action=""
                onSubmit={SubmitForm}
                className="pt-5  Playlist_Form"
                encType="multipart/form-data"
            >


                <header>
                    <h3>Update Playlist</h3>
                    <div className="frameIcon" onClick={() => {
                        set_ValuePlaylist(albumModel.init)
                        on_DropDown()
                    }}>
                        <Close_Icon color="#000" w={30} />
                    </div>
                </header>
                <div className="contentFrame">
                    <input
                        type="text"
                        className="inputNamePlaylist"
                        placeholder="Name"
                        value={valuePlaylist.Playlist_Name}
                        onChange={(e) => {
                            set_ValuePlaylist({ ...valuePlaylist, Playlist_Name: e.target.value })
                            set_Change({ ...change, Playlist_Name: e.target.value })
                        }}
                    />
                    <input
                        type="text"
                        className="inputNamePlaylist"
                        placeholder="Artist"
                        value={valuePlaylist.Artist}
                        onChange={(e) => {
                            set_ValuePlaylist({ ...valuePlaylist, Artist: e.target.value })
                            set_Change({ ...change, Artist: e.target.value })
                        }}
                    />
                    <div className="inputCheck">
                        <h3>Public</h3>
                        <input
                            type="checkbox"
                            name=""
                            id="inputModalPlaylist"
                            defaultChecked={playlist.is_Publish}
                            onChange={(e) => {
                                set_ValuePlaylist({
                                    ...valuePlaylist,
                                    is_Publish: e.currentTarget.checked,
                                });
                                set_Change({ ...change, is_Publish: Boolean(e.target.value) })
                            }}
                        />
                    </div>
                </div>
                <div className="Playlist_Layout">
                    <div className="thumnail_playlist" style={{ backgroundImage: `url(${urlThumnail})` }}>
                        <div className="content_Playlist">
                            <Image src={urlImg || imgTemp} alt="" width={70} height={70} loading="lazy" />
                            <div className="">
                                <h1>{valuePlaylist.Playlist_Name != '' ? valuePlaylist.Playlist_Name : "Name"}</h1>
                                <div className="Quality"><span>13  </span>Songs</div>
                            </div>
                        </div>
                    </div>
                    <div className="temp_Layout">
                    </div>
                </div>
                <div className="btn_Form_Playlist">
                    <label htmlFor="image_Playlist">Image</label>
                    <input type="file" name="image_Playlist" id="image_Playlist" className="none"
                        onChange={(e) => {
                            Set_urlImg(e.target.files ? URL.createObjectURL(e.target.files[0]) : '')
                            set_Change({ ...change, Image: e.target?.files ? e.target.files[0] : undefined })
                        }}
                    />

                    <label htmlFor="thumnail_Playlist">Thumnail</label>
                    <input type="file" name="thumnail_Playlist" id="thumnail_Playlist" className="none"
                        onChange={(e) => {
                            Set_urlThum(e.target.files ? URL.createObjectURL(e.target.files[0]) : '')
                            set_Change({ ...change, Thumbnail: e.target?.files ? e.target.files[0] : undefined })
                        }}
                    />
                </div>

                <div className="footerModalPlaylist">
                    <div className="btnModal btnClose" onClick={() => {
                        set_ValuePlaylist(playlistModel.init)
                        on_DropDown()
                    }
                    }>
                        Close
                    </div>
                    <button type="submit" className="btnModal btnAction" >
                        Action
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdatePlaylistModal;
