import React, { useEffect, useState } from "react";
import "./_listComment.scss";
import { ArrowLineRight_Icon, Close_Icon, Send_Icon } from "@/Icons/icon_Figma";
import ItemCommentPopup from "@/components/popup/comment/itemComment";
import { useLayout } from "@/contexts/providerLayout";
import { SuperHappy_Icon } from "@/Icons/emoji_Figma";
import {
    commentModel,
    commentType,
    create_commentType,
    list_commentType,
} from "@/model/commentModel";
import { Comment } from "@/apis/Comment";
import { toast } from "react-toastify";
import { Reply } from "@/apis/Reply";
import { create_replyType, replyModel } from "@/model/replyModel";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { useReload } from "@/contexts/providerReload";
import { songType } from "@/model/songModel";
type Props = {
    Song: songType;
};
const ListComment = ({ Song }: Props) => {
    const { setShowCommentPopup, is_commentPopup } = useLayout();
    const { set_ReReply, set_ReComment, re_comment } = useReload()
    const userProvider = useSelector((state: RootState) => state.auth);
    const [listComment, set_listCommnet] = useState<list_commentType>([]);
    const [valueComment, set_valueComment] = useState<create_commentType>(
        commentModel.init_create
    );
    const [showReply, set_showReply] = useState(false);
    const [valueComment_reply, set_ValueComment_reply] = useState<commentType>(
        commentModel.init
    );
    const [valueReply, set_ValueReply] = useState<create_replyType>(
        replyModel.inti_create
    );
    const handle_SendComment = () => {
        if (userProvider.is_Login && userProvider.Access_Token != "") {
            if (valueComment_reply.Comment_Id != "" && showReply) {
                Reply.Create({
                    ...valueReply,
                    Comment_Id: valueComment_reply.Comment_Id,
                }).then((res) => {
                    if (res.status == 200) {
                        set_ReReply()
                        set_showReply(false)
                        set_ValueComment_reply(commentModel.init)
                        set_ValueReply(replyModel.inti_create)

                    } else {
                        toast.error(res.message);
                    }
                });
            } else {
                Comment.Create(valueComment).then((res) => {
                    if (res.status === 200) {
                        set_valueComment({ ...valueComment, Content: "" });
                        set_ReComment()
                    } else {
                        toast.error(res.message);
                    }
                });
            }
        } else {
            toast.error("Please login to comment");
        }
    };

    const handleReply = (reply: commentType) => {
        set_showReply(true);
        set_ValueComment_reply(reply);
    };

    useEffect(() => {
        if (!!Song && is_commentPopup) {
            Comment.Get_SongId(Song.Song_Id).then((res) => set_listCommnet(res.data));
        }
        set_valueComment({ ...valueComment, Song_Id: Song.Song_Id });
    }, [Song, re_comment, is_commentPopup]);

    return (
        <div className="frameComment">
            <header>
                <div className="titleHaeaderListPopup">Comment</div>
                <span></span>
                <div
                    className="frameIconListPopup cursor_pointer"
                    onClick={setShowCommentPopup}
                >
                    <Close_Icon w={40} color="#000" />
                </div>
            </header>
            <div className="ListCommentPopup">
                {listComment.length > 0 &&
                    listComment.map((comment: commentType, index: number) => {
                        return (
                            <ItemCommentPopup
                                comment={comment}
                                song={Song}
                                key={index}
                                handle_Reply={handleReply}
                            />
                        );
                    })}

                {listComment.length == 0 && (
                    <div className="nothingInComment">Be the first to comment</div>
                )}
            </div>
            <div
                className={`frameContentReplyComment ${showReply && "activeFrameContentReplyComment"
                    }`}
            >
                <div className="frameIcon">
                    <ArrowLineRight_Icon />
                </div>
                <div className="ContentCommentReply overflow__Text">
                    <h1>{valueComment_reply.User_Name}</h1>
                    <span>:</span> <h3>{valueComment_reply.Content}</h3>
                </div>
                <div
                    className="frameIcon cursor_pointer"
                    onClick={() => {
                        set_showReply(false);
                        set_ValueComment_reply(commentModel.init);
                    }}
                >
                    <Close_Icon w={30} />
                </div>
            </div>
            <div className="frameInputCommemt">
                <div className="contentInputComment">
                    <div className="frameIcon">
                        <SuperHappy_Icon />
                    </div>
                    <div className="InputText">
                        <textarea
                            name=""
                            id=""
                            placeholder="Enter your message..."
                            value={showReply ? valueReply.Content : valueComment.Content}
                            onChange={(e) => {
                                if (showReply && valueComment_reply.Comment_Id != "") {
                                    set_ValueReply({ ...valueReply, Content: e.target.value });
                                } else {
                                    set_valueComment({
                                        ...valueComment,
                                        Content: e.target.value,
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className="btnSend " onClick={handle_SendComment}>
                        <Send_Icon w={28} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComment;
