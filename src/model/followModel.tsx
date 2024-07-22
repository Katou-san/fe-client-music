const init = {
    Following: '',
    Follower: '',
    Date: ''
}

const initRes = {
    Following: [init],
    Follower: [init],
}

export const followModel = {
    init: init,
    init_res: initRes
}

export type followType = typeof init
export type res_followType = typeof initRes
