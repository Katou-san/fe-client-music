"use client";
import React, { useEffect, useState } from "react";
import { albumModel, create_Album, create_Playlist, playlistModel } from "@/model/playlistModel";
import './_albumModal.scss'
import Image from "next/image";
import imgTemp from '../../../../../public/temp.jpg'
import { Close_Icon } from "@/Icons/icon_Figma";
import { useLayout } from "@/contexts/providerLayout";
type Prop = {
    isOpen: boolean;
    onOpenChange: () => void;
    table: string;
    data?: any;
};

const AlbumModal = () => {
    // const { set_ReloadPlaylist } = useReload()
    const { is_albumForm, setAlbumForm } = useLayout()
    const [value_Album, set_ValueAlbum] = useState<create_Album>(
        albumModel.init_create
    );
    const [url_load, Set_url] = useState<{ img: any, thumnail: any }>({ img: "", thumnail: "" })

    // useEffect(() => {
    //     // Set_Title(table);
    //     // Send.Image_P('default.png')
    //     //     .then(respone => {
    //     //         Send.Thumnail_P('default.png')
    //     //             .then(res => Set_url({ img: URL.createObjectURL(respone), thumnail: URL.createObjectURL(res) }))
    //     //     })
    // }, [table, data]);


    const SubmitForm = (e: any) => {
        e.preventDefault();
        setAlbumForm(false)
        console.log(value_Album)
        // const Error_Check = Validate_Playlist(
        //     Value_playlist.Playlist_Name,
        //     Value_playlist.Artist
        // );

        // if (!Error_Check.status) {
        //     const formdata = Form_Data({ ...Value_playlist, is_Publish: status, Type: 1 });
        //     Playlist.Create(formdata).then((res) => {
        //         if (res.status == 200) {
        //             set_ReloadPlaylist()
        //             toast.success(res.message);
        //             onClose();
        //         } else {
        //             toast.error(res.message);
        //         }
        //     });
        // } else {
        //     let Array_Key = Object.keys(Error_Check.Error);
        //     toast.error(Error_Check.Error[Array_Key[0]]);
        // }
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
                    <div className="frameIcon" onClick={() => setAlbumForm(false)}>
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
                    <input
                        type="text"
                        className="inputNamePlaylist"
                        placeholder="Artist"
                        value={value_Album.Artist}
                        onChange={(e) => {
                            set_ValueAlbum({ ...value_Album, Artist: e.target.value })
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
                    <div className="btnModal btnClose" onClick={() => { }}>
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
