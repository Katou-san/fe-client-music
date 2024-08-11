"use client";
import React, { useEffect, useState } from "react";
import { albumModel, create_Album, create_Playlist, playlistModel } from "@/model/playlistModel";
import './_albumModal.scss'
import Image from "next/image";
import imgTemp from '../../../../../public/temp.jpg'
import { Close_Icon } from "@/Icons/icon_Figma";
import { useLayout } from "@/contexts/providerLayout";
import { playlistValidate } from "@/util/validate/playlistReq";
import { Form_Data } from "@/util/FormData/Form_Data";
import { Playlist } from "@/apis/Playlist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { Role } from "@/apis/Role";
import { roleModel, roleType } from "@/model/roleModel";
import { RoleConfigCreator } from "@/configs/rolesConfig";
type Prop = {
    isOpen: boolean;
    onOpenChange: () => void;
    table: string;
    data?: any;
};

const AlbumModal = () => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const { is_albumForm, setAlbumForm } = useLayout()
    const [infoRole, set_infoRole] = useState<roleType>(roleModel.init)
    const [value_Album, set_ValueAlbum] = useState<create_Album>(
        albumModel.init_create
    );
    const [url_load, Set_url] = useState<{ img: any, thumnail: any }>({ img: "", thumnail: "" })

    useEffect(() => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            Role.Get_Current()
                .then((res) => {
                    if (res.status == 200) {
                        set_infoRole(res.data)
                    }
                })
        }
    }, [is_albumForm])


    const SubmitForm = (e: any) => {
        e.preventDefault();
        const Error_Check = playlistValidate.create(value_Album.Playlist_Name)
        if (!Error_Check.status) {
            if (infoRole?.Role_Id != '' && RoleConfigCreator.includes(String(infoRole?.Role_Name).toLowerCase())) {
                const formdata = Form_Data({ ...value_Album, Type: 2, Artist: userProvider.User_Name });
                Playlist.Create_Album(formdata).then((res) => {
                    if (res.status == 200) {
                        setAlbumForm(false)
                        set_ValueAlbum(albumModel.init)
                        toast.success(res.message)
                    } else {
                        toast.error(res.message);
                    }
                });
            } else {
                toast.warning('You need come to creator to create a new album')
            }

        } else {
            let Array_Key = Object.keys(Error_Check.Error);
            toast.error(Error_Check.Error[Array_Key[0]]);
        }
    };
    return (
        <div className={`formAddAlbum ${is_albumForm && 'activeformAddAlbum'}`}>

            <form
                action=""
                onSubmit={SubmitForm}
                className="pt-5  Playlist_Form"
                encType="multipart/form-data"
            >


                <header>
                    <h3>Create album</h3>
                    <div className="frameIcon" onClick={() => {
                        set_ValueAlbum(albumModel.init)
                        setAlbumForm(false)
                    }}>
                        <Close_Icon color="#000" w={30} />
                    </div>
                </header>
                <div className="contentFrame">
                    <input
                        type="text"
                        className="inputNamePlaylist"
                        placeholder="Name"
                        value={value_Album.Playlist_Name}
                        onChange={(e) => {
                            set_ValueAlbum({ ...value_Album, Playlist_Name: e.target.value })
                        }}
                    />
                    <div className="inputCheck">
                        <h3>Public</h3>
                        <input
                            type="checkbox"
                            name=""
                            id="inputModalPlaylist"
                            onChange={(e) => {
                                set_ValueAlbum({
                                    ...value_Album,
                                    is_Publish: e.currentTarget.checked,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="Playlist_Layout">
                    <div className="thumnail_playlist" style={{ backgroundImage: `url(${url_load.thumnail})` }}>
                        <div className="content_Playlist">
                            <Image src={url_load.img || imgTemp} alt="" width={70} height={70} loading="lazy" />
                            <div className="">
                                <h1>{value_Album.Playlist_Name != '' ? value_Album.Playlist_Name : "Name"}</h1>
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
                            Set_url({ ...url_load, img: e.target.files ? URL.createObjectURL(e.target.files[0]) : url_load.thumnail })
                            set_ValueAlbum({ ...value_Album, Image: e.target?.files ? e.target.files[0] : null })
                        }}
                    />

                    <label htmlFor="thumnail_Playlist">Thumnail</label>
                    <input type="file" name="thumnail_Playlist" id="thumnail_Playlist" className="none"
                        onChange={(e) => {
                            Set_url({ ...url_load, thumnail: e.target.files ? URL.createObjectURL(e.target.files[0]) : url_load.thumnail })
                            set_ValueAlbum({ ...value_Album, Thumbnail: e.target?.files ? e.target.files[0] : null })
                        }}
                    />
                </div>

                <div className="footerModalPlaylist">
                    <div className="btnModal btnClose" onClick={() => {
                        set_ValueAlbum(albumModel.init)
                        setAlbumForm(false)
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

export default AlbumModal;
