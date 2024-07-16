"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./_moreModal.scss";
import { list_playlistType } from "@/model/playlistModel";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { commentType } from "@/model/commentModel";
import { Comment } from "@/apis/Comment";
import { toast } from "react-toastify";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    onReload: () => void;
    comment: commentType
    style?: React.CSSProperties
    type?: number
};

const MoreModalDropDown = ({ drop_Down, set_Drop, comment, style, type = 0, onReload }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
    const [list_Playlits, set_list] = useState<list_playlistType>([]);
    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                set_Drop();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);

    useEffect(() => {

    }, [drop_Down]);

    const handleDeleteComment = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            Comment.Delete(comment.Comment_Id)
                .then((res) => {
                    if (res.status == 200) {
                        toast.success(res.message)
                        onReload()
                        set_Drop();
                    } else {
                        toast.warning(res.message)
                    }
                })
        }
    }

    return (
        <div
            className={`dropDownComment ${drop_Down && "activeDropDownComment"}`}
            style={style}
            ref={itemRef}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <>
                <ul>
                    <li
                        className={` ${type == 1 ? "paused" : ""} overflow__Text`}
                        onClick={handleDeleteComment}
                    >
                        Delete
                    </li>
                    <li
                        className={` vacation overflow__Text`}
                        onClick={() => { }}
                    >
                        Lock
                    </li>
                </ul> </>}
        </div>
    );
};

export default MoreModalDropDown;
