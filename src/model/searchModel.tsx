import { playlistModel } from "@/model/playlistModel";
import { SongModel } from "@/model/songModel";
import { userModel } from "@/model/userModel";

const initAll = {
    Song: [SongModel.init],
    Playlist: [playlistModel.init],
    Album: [playlistModel.init],
    Artist: [userModel.init],
}

export const searchModel = {
    init_All: initAll
}

export type all_searchType = typeof initAll