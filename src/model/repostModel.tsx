const initRepost = [{
    Repost_Id: "",
    Song_Id: "",
    User_Id: "",
    Post_Time: "",
}]

export const repostModel = {
    init: initRepost[0],
    init_list: initRepost
}

export type repostType = typeof initRepost[0]
export type list_repostType = typeof initRepost