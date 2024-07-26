const initSub = [{
    Sub_Id: "",
    Sub_Title: "",
    Price: 0,
    Content: "",
    Storage: 0,
    Duration: 0,
    Status: true,
    Create_Date: "",
}]

export const subModel = {
    init: initSub[0],
    init_list: initSub
}

export type subType = typeof initSub[0]
export type list_subType = typeof initSub