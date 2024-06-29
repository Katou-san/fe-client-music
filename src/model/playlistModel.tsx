const list_Playlist = [
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

type list_Playlist_type = typeof list_Playlist
const Create_Playlist = {
    Playlist_Name: "",
    is_Publish: true,
    Image: "",
    Thumbnail: "",
    Type: 1,
    Artist: ""
}


export const playlist = {
    init: list_Playlist[0],
    init_create: Create_Playlist,
};




