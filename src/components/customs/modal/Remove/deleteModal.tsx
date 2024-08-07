'use client'
import React, { useEffect, useRef, useState } from 'react';
import "./_deleteModal.scss"
import { Close_Icon } from '@/Icons/icon_Figma';
import { songType } from '@/model/songModel';


type Props = {
    value: songType
    handle_Delete: () => void
    onReload?: () => void
    drop_Down: boolean
    onClosed?: () => void
}


const DeleteModal = ({ value, handle_Delete, onReload = () => { }, drop_Down, onClosed = () => { } }: Props) => {
    const itemRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                onClosed();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);


    return (
        <div className={`frameDeleteSong ${drop_Down && 'activeFrameDeleteSong'}`} ref={itemRef}>
            <div className="headerDelete">
                <h1>Delete Song  </h1>
                <div className="frameIconListPopup cursor_pointer" onClick={onClosed}>
                    <Close_Icon w={40} color='#000' />
                </div>
            </div>
            <div className="bodyDelete">
                <div className="contentDelete overflow__Text">
                    <h1>Do you want delete </h1>
                    <h3>{value?.Song_Name}</h3>
                </div>
            </div>
            <div className="footerModalPlaylist">
                <div className="btnModal btnClose" onClick={onClosed}>
                    Close
                </div>
                <div className="btnModal btnAction" onClick={handle_Delete}>
                    Action
                </div>
            </div>

        </div>
    );
}

export default DeleteModal;
