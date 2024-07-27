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
  Type: 1,
  Artist: "",
};


const Update_Playlist = {
  Image: "",
  Thumbnail: "",
}
export const playlistModel = {
  init: list_Playlist_init[0],
  init_list: list_Playlist_init,
  init_create: Create_Playlist,
  init_update: Update_Playlist
};

const Create_Album = {
  Image: "",
  Thumbnail: "",
  Playlist_Name: "",
  is_Publish: true,
  Type: 2,
  Artist: "",
}


export const albumModel = {
  init: list_Playlist_init[0],
  init_list: list_Playlist_init,
  init_create: Create_Album,

};



export type playlistType = (typeof list_Playlist_init)[0];
export type list_playlistType = typeof list_Playlist_init;
export type create_Playlist = typeof Create_Playlist;
export type create_Album = {
  Image: any,
  Thumbnail: any,
  Playlist_Name: string,
  is_Publish: boolean,
  Type: number,
  Artist: string,
};

export type update_Playlist = {
  Image: any,
  Thumbnail: any,
  Playlist_Name?: string,
  is_Publish?: boolean,
  Type?: number,
  Artist?: string,
};
