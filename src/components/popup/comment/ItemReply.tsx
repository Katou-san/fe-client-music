import Image from 'next/image';
import React from 'react';

const ItemReplyPopup = () => {
    const url =
        "https://www.siliconera.com/wp-content/uploads/2024/05/star-rail-hope-is-a-thing-with-feathers-guide.jpg";
    return (
        <div className="itemReplyPopup">
            <div className="contentReply">
                <div className="infoReply">
                    <Image src={url} alt="" width={1000} height={1000} />
                </div>
                <div className="ReplyText">
                    <div className="headerItemReply">
                        <h1>Name</h1>
                    </div>
                    <div className="content">
                        <div className="textReply overflow__Text_Endline">
                            dfg
                        </div>
                    </div>
                    <div className="footerItemReply">
                        <div className="timeReply cursor_pointer">
                            Yesterday
                        </div>
                        <span></span>
                        <div className="replyReply cursor_pointer">Reply</div>
                        <span></span>
                        <div className="likeReply cursor_pointer">Like</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemReplyPopup;
