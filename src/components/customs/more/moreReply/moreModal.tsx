"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./_moreModal.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { toast } from "react-toastify";
import { Reply } from "@/apis/Reply";
import { replyType } from "@/model/replyModel";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    onReload: () => void;
    reply: replyType
    style?: React.CSSProperties
    type?: number
};

const MoreReplyDropDown = ({ drop_Down, set_Drop, reply, style, type = 0, onReload }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
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
            Reply.Delete(reply.Reply_Id)
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
                </ul> </>}
        </div>
    );
};

export default MoreReplyDropDown;
