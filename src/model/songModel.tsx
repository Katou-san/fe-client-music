const list_song_init = [
    {
        _id: "",
        Song_Id: "",
        Song_Name: "",
        Song_Image: "",
        Song_Audio: "",
        Artist: "",
        Like: 0,
        User_Id: "",
        Category_Id: "",
        Lyrics: "",
        Tag: "",
        Color: "",
        is_Publish: true,
        Create_Date: ""
    },
];

const create_Song = {
    Song_Name: "",
    Song_Image: null,
    Song_Audio: null,
    Artist: "",
    Like: 0,
    User_Id: "",
    Category_Id: "",
    Lyrics: "",
    Tag: "",
    Color: "",
    is_Publish: true,
}

const update_Song = {
    Song_Name: "",
    Song_Image: null,
    Artist: "",
    Category_Id: "",
    Lyrics: "",
    Tag: "",
    Color: "",
    is_Publish: true,
}

export const SongModel = {
    init: list_song_init[0],
    init_list: list_song_init,
    init_create: create_Song,

}

export type songType = typeof list_song_init[0]
export type list_songType = typeof list_song_init
export type create_songType = {
    Song_Name: string,
    Song_Image: any,
    Song_Audio: any,
    Artist: string,
    Like: number,
    User_Id: string,
    Category_Id: string,
    Lyrics: string,
    Tag: string,
    Color: string,
    is_Publish: boolean,
}

export type update_songType = {
    Song_Name?: string,
    Song_Image?: any,
    Song_Audio?: any,
    Artist?: string,
    Category_Id?: string,
    Lyrics?: string,
    Tag?: string,
    Color?: string,
    is_Publish?: boolean,
}