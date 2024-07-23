'use client'
import { Like } from '@/apis/Like';
import { Send } from '@/apis/Send';
import MoreReplyDropDown from '@/components/customs/more/moreReply/moreModal';
import { useReload } from '@/contexts/providerReload';
import { RootState } from '@/hooks/redux/store';
import { Dislike_Icon, Star_Icon } from '@/Icons/icon_Figma';
import { MoreIcon } from '@/Icons/icon_v1';
import { create_likeType, likeModel, list_likeType } from '@/model/likeModel';
import { replyType } from '@/model/replyModel';
import { URLValidate } from '@/util/validate/url';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
type Props = {
    reply: replyType
}
const ItemReplyPopup = ({ reply }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const { set_ReReply } = useReload()
    const [url, set_url] = useState('')
    const [drop_Down, set_DropDown] = useState(false)
    const [listLikeReply, set_listLikeReply] = useState<list_likeType>([])
    const [stateLike, set_StateLike] = useState<create_likeType>(
        likeModel.init_create
    );
    useEffect(() => {
        if (URLValidate.isUrl(reply.Avatar)) {
            Send.Avatar(reply.Avatar)
                .then((res) => set_url(URL.createObjectURL(res)))
        } else {
            set_url(reply.Avatar)
        }
        if (reply?.Reply_Id) {
            Promise.all([
                Like.Get_Current(reply.Reply_Id, 4).then((res) => {
                    if (res.status == 200) {
                        set_StateLike(res.data)
                    }
                }),
                Like.Get_Reply(reply.Reply_Id).then((res) => {
                    if (res.status == 200) {
                        set_listLikeReply(res.data)
                    }
                }),
            ])

        }
    }, [reply])


    const handleLike = (type: "like" | "dislike") => {
        if (userProvider.Access_Token != "" && userProvider.is_Login) {
            if (reply.Reply_Id != null && reply.Reply_Id != '') {
                if (type == "like") {
                    if (stateLike.State == 1) {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: reply.Reply_Id, State: 0, Type: 4 })
                            .then(res => {
                                Get_Like()
                            })
                    } else {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: reply.Reply_Id, State: 1, Type: 4 })
                            .then(res => {
                                Get_Like()
                            })
                    }
                } else {
                    if (stateLike.State == -1) {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: reply.Reply_Id, State: 0, Type: 4 })
                            .then(res => {
                                Get_Like()
                            })
                    } else {
                        Like.Togo_Create_Update({ ...stateLike, Topic_Id: reply.Reply_Id, State: -1, Type: 4 })
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
            Like.Get_Reply(reply.Reply_Id).then((res) => {
                if (res.status == 200) {
                    set_listLikeReply(res.data)
                }
            }),
            Like.Get_Current(reply.Reply_Id, 4).then((res) => {
                if (res.status == 200) {
                    set_StateLike(res.data)
                }
            })
        ])

    }

    return (
        <div className="itemReplyPopup">
            <div className="contentReply">
                <div className="infoReply">
                    <Image src={url} alt="" width={1000} height={1000} />
                </div>
                <div className="ReplyText">
                    <div className="headerItemReply">
                        <h1>{reply?.User_Name}</h1>
                        <span></span>
                    </div>
                    <div className="content">
                        <div className="textReply overflow__Text_Endline">{reply?.Content}</div>
                        <div className="iconReply cursor_pointer">
                            <div className={`frameStarIcon ${stateLike.State == 1 && 'activeframeStarIcon'}`} onClick={() => handleLike('like')}>
                                <div className={`frameIcon`} >
                                    <Star_Icon w={25} color="rgb(150, 149, 149)" />
                                </div>
                                <h3>{listLikeReply.length}</h3>
                            </div>
                            <div className={`frameDislikeIcon ${stateLike.State == -1 && 'activeframeDislikeIcon'}`} onClick={() => handleLike('dislike')}>
                                <div className={`frameIcon `} >
                                    <Dislike_Icon w={25} color="rgb(150, 149, 149)" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footerItemReply">
                        <div className="timeReply cursor_pointer">{new Date(reply.Post_Time).toLocaleDateString()}</div>
                        <span></span>
                        {/* <div className="replyReply cursor_pointer" onClick={() => { }}>Reply</div>
                        <span></span> */}
                        <div className="moreIcon cursor_pointer" onClick={() => set_DropDown(true)}>
                            <MoreIcon w={15} color="#20202092" />
                        </div>
                        <div></div>
                    </div>
                    <div className="listReplyPopup">


                    </div>
                </div>
            </div>
            <MoreReplyDropDown drop_Down={drop_Down} set_Drop={() => set_DropDown(false)} style={{ top: '70%', left: "40%" }} reply={reply} type={1} onReload={set_ReReply} />
        </div>
    );
}

export default ItemReplyPopup;
