const listInitReply = [{
    Reply_Id: "",
    Comment_Id: "",
    User_Id: "",
    Content: "",
    Post_Time: "",
    User_Name: "",
    Avatar: ""
}]

const inti_create = {
    Comment_Id: "",
    Content: "",
}

export const replyModel = {
    init: listInitReply[0],
    inti_create,
    init_list: listInitReply
}



export type replyType = typeof listInitReply[0]
export type create_replyType = {
    Comment_Id: string,
    Content: string,
}
export type list_replyType = typeof listInitReply