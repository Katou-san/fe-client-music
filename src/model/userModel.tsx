

const list_user_init = [{
    User_Id: "",
    User_Email: "",
    User_Pass: "",
    User_Name: "",
    Color: "",
    Avatar: "",
    Phone: "",
    Role_Id: "",
    CCCD: "",
    is_Premium: false,
    is_Admin: false,
    Status: 1,
    Create_date: "",
}]

const infoUser = {
    Upload: "",
    Like: ""
}

const initUpdate = {

    Avatar: undefined
}

export const userModel = {
    init: list_user_init[0],
    init_info: infoUser,
    init_list: list_user_init,
    init_update: initUpdate
}

export type userType = typeof list_user_init[0]
export type list_userType = typeof list_user_init
export type update_userType = {
    User_Name?: string,
    Phone?: string,
    Color?: string,
    Avatar?: any
}

export type info_userType = {
    Upload: string,
    Like: string
}