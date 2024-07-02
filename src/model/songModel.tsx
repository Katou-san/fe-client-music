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

export const SongModel = {
    init: list_song_init[0],
    init_list: list_song_init
}

export type songType = typeof list_song_init[0]
export type list_songType = typeof list_song_init