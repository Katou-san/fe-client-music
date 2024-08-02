const initArtist = [{
    Artist_Id: '',
    Artist_Key: '',
    Artist_Name: '',
    User_Id: '',
    Vertify: false,
}]

const createArtist = {
    Artist_Name: '',
    Vertify: false,
}

export const artistModel = {
    init: initArtist[0],
    init_create: createArtist
}

export type artistType = typeof initArtist[0]
export type create_artistType = {
    Artist_Name: string,
    User_Id?: string,
    Vertify?: boolean,
}
export type update_artistType = {
    User_Id?: string,
    Vertify?: boolean,
}

export type list_artistType = typeof initArtist
