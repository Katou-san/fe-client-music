const init = {
    Following: '',
    Follower: '',
    Date: ''
}

const initRes = {
    Following: [init],
    Follower: [init],
}

const init_Create = {
    Following: ''
}

export const followModel = {
    init: init,
    init_res: initRes,
    init_create: init_Create
}

export type followType = typeof init
export type create_followType = typeof init_Create
export type res_followType = typeof initRes
