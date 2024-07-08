import { Reply } from "@/apis/Reply";
import { Send } from "@/apis/Send";
import ItemReplyPopup from "@/components/popup/comment/ItemReply";
import { ArrowLineDown_Icon, ArrowLineUp_Icon, Dislike_Icon, Like_Icon, Star_Icon } from "@/Icons/icon_Figma";
import { commentType } from "@/model/commentModel";
import { list_replyType, replyType } from "@/model/replyModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
    comment: commentType
}
const ItemCommentPopup = ({ comment }: Props) => {
    const [showReply, set_ShowReply] = useState(false)
    const [url, set_url] = useState('')
    const [listReply, set_listReply] = useState<list_replyType>([])
    useEffect(() => {
        if (URLValidate.isUrl(comment.Avatar)) {
            Send.Avatar(comment.Avatar)
                .then((res) => set_url(URL.createObjectURL(res)))
        } else {
            set_url(comment.Avatar)
        }
    }, [comment])

    useEffect(() => {
        if (showReply) {
            Reply.Get_Id(comment.Comment_Id)
                .then(res => set_listReply(res.data))
        }
    }, [showReply])

    return (
        <div className="itemCommentPopup">
            <div className="contentComment">
                <div className="infoComment">
                    <Image src={url} alt="" width={1000} height={1000} />
                </div>
                <div className="commentText">
                    <div className="headerItemComment">
                        <h1>{comment?.User_Name}</h1>
                    </div>
                    <div className="content">
                        <div className="textComment overflow__Text_Endline">{comment?.Content}</div>

                    </div>
                    <div className="footerItemComment">
                        <div className="timeComment cursor_pointer">Yesterday</div>
                        <span></span>
                        <div className="replyComment cursor_pointer">Reply</div>
                        <span></span>
                        <div className="likeComment cursor_pointer">
                            <div className="frameStarIcon">
                                <div className="frameIcon">
                                    <Star_Icon w={30} color="rgb(150, 149, 149)" />
                                </div>
                                <h3>12</h3>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="listReplyPopup">

                        {listReply.length > 0 && showReply == true && listReply.map((reply: replyType, index) => {
                            return (
                                <ItemReplyPopup key={index} />
                            );
                        })}

                        {listReply.length > 0 &&
                            <div className="btnShowMore" onClick={() => set_ShowReply(prev => !prev)}>
                                <h1>{showReply ? "Hidden" : "Show more"}</h1>
                                {showReply == false && <ArrowLineDown_Icon color="rgb(119, 118, 118)" />}
                                {showReply && <ArrowLineUp_Icon color="rgb(119, 118, 118)" />}
                            </div>

                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCommentPopup;
