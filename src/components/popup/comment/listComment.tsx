import React, { useEffect, useState } from "react";
import "./_listComment.scss";
import { Close_Icon, Send_Icon } from "@/Icons/icon_Figma";
import ItemCommentPopup from "@/components/popup/comment/itemComment";
import { useLayout } from "@/contexts/providerLayout";
import { SuperHappy_Icon } from "@/Icons/emoji_Figma";
import { commentModel, commentType, create_commentType, list_commentType } from "@/model/commentModel";
import { Comment } from "@/apis/Comment";
import { toast } from "react-toastify";
type Props = {
    Song_Id: string
}
const ListComment = ({ Song_Id }: Props) => {
    const { setShowCommentPopup, is_commentPopup } = useLayout();
    const [reload, set_Reload] = useState(false)
    const [listComment, set_listCommnet] = useState<list_commentType>([])
    const [valueComment, set_valueComment] = useState<create_commentType>(commentModel.init_create);
    const handle_SendComment = () => {
        Comment.Create(valueComment)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.message)
                    set_valueComment({ ...valueComment, Content: "" })
                    set_Reload(prev => !prev)
                } else {
                    toast.error(res.message)
                }
            })
    }
    useEffect(() => {
        if (!!Song_Id && is_commentPopup) {
            Comment.Get_SongId(Song_Id)
                .then((res) => set_listCommnet(res.data))
        }
        set_valueComment({ ...valueComment, Song_Id })
    }, [Song_Id, reload, is_commentPopup])




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
                        return <ItemCommentPopup comment={comment} key={index} onReload={() => set_Reload(pre => !pre)} />;
                    })}

                {listComment.length == 0 && (
                    <div className="nothingInComment">Be the first to comment</div>
                )}
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
                            value={valueComment.Content}
                            onChange={(e) => {
                                set_valueComment({ ...valueComment, Content: e.target.value });
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
