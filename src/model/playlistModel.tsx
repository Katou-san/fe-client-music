const list_Playlist_init = [
    {
        Playlist_Id: "",
        Playlist_Name: "",
        Artist: "",
        Image: "",
        Thumbnail: "",
        User_Id: "",
        is_Publish: true,
        Type: 1,
        Create_Date: "",
        createdAt: "",
        Tracks: [],
    },
];


const Create_Playlist = {
    Playlist_Name: "",
    is_Publish: true,
    Image: "",
    Thumbnail: "",
    Type: 1,
    Artist: ""
}


export const playlistModel = {
    init: list_Playlist_init[0],
    init_list: list_Playlist_init,
    init_create: Create_Playlist,
};


export type list_playlistType = typeof list_Playlist_init


