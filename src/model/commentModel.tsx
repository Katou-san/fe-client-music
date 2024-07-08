
const initListComment = [{
    Comment_Id: "",
    Song_Id: "",
    User_Id: "",
    Content: "",
    Post_Time: "",
    User_Name: "",
    Avatar: ""
}]

const initCreateComment = {
    Song_Id: "",
    Content: "",
}

const initUpdateComment = {
    Content: "",
}

export const commentModel = {
    init: initListComment[0],
    init_list: initListComment,
    init_create: initCreateComment,
    init_update: initUpdateComment,
}

export type commentType = typeof initListComment[0]
export type list_commentType = typeof initListComment
export type create_commentType = typeof initCreateComment
export type update_commentType = typeof initUpdateComment