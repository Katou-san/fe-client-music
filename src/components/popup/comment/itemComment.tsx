
import { Like } from "@/apis/Like";
import { Reply } from "@/apis/Reply";
import { Send } from "@/apis/Send";
import MoreModalDropDown from "@/components/customs/more/moreModal";
import ItemReplyPopup from "@/components/popup/comment/ItemReply";
import { RootState } from "@/hooks/redux/store";
import { ArrowLineDown_Icon, ArrowLineUp_Icon, Dislike_Icon, Star_Icon } from "@/Icons/icon_Figma";
import { MoreIcon } from "@/Icons/icon_v1";
import { commentType } from "@/model/commentModel";
import { create_likeType, likeModel, list_likeType } from "@/model/likeModel";
import { list_replyType, replyType } from "@/model/replyModel";
import { URLValidate } from "@/util/validate/url";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {
    comment: commentType
    onReload: () => void
}
const ItemCommentPopup = ({ comment, onReload }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const [showReply, set_ShowReply] = useState(false)
    const [drop_Down, set_DropDown] = useState(false)
    const [url, set_url] = useState('')
    const [listReply, set_listReply] = useState<list_replyType>([])
    const [listLikeComment, set_listLikeComment] = useState<list_likeType>([])
    const [stateLike, set_StateLike] = useState<create_likeType>(
        likeModel.init_create
    );
    useEffect(() => {
        if (URLValidate.isUrl(comment.Avatar)) {
            Send.Avatar(comment.Avatar)
                .then((res) => set_url(URL.createObjectURL(res)))
        } else {
            set_url(comment.Avatar)
        }
        if (comment?.Comment_Id) {
            Promise.all([
                Like.Get_Current(comment.Comment_Id, 3).then((res) => {
                    if (res.status == 200) {
                        set_StateLike(res.data)
                    }
                }),
                Like.Get_Comment(comment.Comment_Id).then((res) => {
                    if (res.status == 200) {
                        set_listLikeComment(res.data)
                    }
                })
            ])

        }
    }, [comment])

    useEffect(() => {
        if (showReply) {

            Reply.Get_Id(comment.Comment_Id)
                .then(res => set_listReply(res.data))
        }
    }, [showReply])

    const handleLike = (type: "like" | "dislike") => {
        if (userProvider.Access_Token != "" && userProvider.is_Login) {
            if (comment.Comment_Id != null && comment.Comment_Id != '') {
                if (type == "like") {
                    if (stateLike.State == 1) {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: comment.Comment_Id, State: 0, Type: 3 })
                            .then(res => {
                                Get_Like()
                            })
                    } else {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: comment.Comment_Id, State: 1, Type: 3 })
                            .then(res => {
                                Get_Like()
                            })
                    }
                } else {
                    if (stateLike.State == -1) {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: comment.Comment_Id, State: 0, Type: 3 })
                            .then(res => {
                                Get_Like()
                            })
                    } else {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: comment.Comment_Id, State: -1, Type: 3 })
                            .then(res => {
                                Get_Like()
                            })
                    }
                }

            }
        } else {
            toast.error("You need login");
        }
    }

    const Get_Like = () => {
        Promise.all([
            Like.Get_Comment(comment.Comment_Id).then((res) => {
                if (res.status == 200) {
                    set_listLikeComment(res.data)
                }
            }),
            Like.Get_Current(comment.Comment_Id, 3).then((res) => {
                if (res.status == 200) {
                    set_StateLike(res.data)
                }
            })
        ])

    }

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
                        <div className="iconComment cursor_pointer">
                            <div className="frameStarIcon">
                                <div className="frameIcon" onClick={() => handleLike('like')}>
                                    <Star_Icon w={25} color="rgb(150, 149, 149)" />
                                </div>
                                <h3>{listLikeComment.length}</h3>
                            </div>
                            <div className="frameDislikeIcon">
                                <div className="frameIcon" onClick={() => handleLike('dislike')}>
                                    <Dislike_Icon w={25} color="rgb(150, 149, 149)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footerItemComment">
                        <div className="timeComment cursor_pointer">Yesterday</div>
                        <span></span>
                        <div className="replyComment cursor_pointer">Reply</div>
                        <span></span>
                        <div className="moreIcon cursor_pointer" onClick={() => set_DropDown(true)}>
                            <MoreIcon w={15} color="#20202092" />
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
            <MoreModalDropDown drop_Down={drop_Down} set_Drop={() => set_DropDown(false)} comment={comment} style={{ top: '60%', left: "60%" }} type={1} onReload={onReload} />
        </div>
    );
};

export default ItemCommentPopup;
