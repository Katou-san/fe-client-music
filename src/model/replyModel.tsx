const listInitReply = [{
    Reply_Id: "",
    Comment_Id: "",
    User_Id: "",
    Content: "",
    Post_Time: "",
    User_Name: "",
    Arvatar: ""
}]

export const replyModel = {
    init: listInitReply[0],
    init_list: listInitReply
}

export type replyType = typeof listInitReply[0]
export type list_replyType = typeof listInitReply