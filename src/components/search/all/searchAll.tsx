import ListArtist from '@/components/home/Artists/listArtist';
import ListPlaylist from '@/components/home/Playlists/listPlaylist';
import ItemSong from '@/components/search/itemSong';
import ItemTopResult from '@/components/search/itemTopResult';
import { LoadingSVGWatting } from '@/Icons/Loading';
import { list_playlistType, playlistModel } from '@/model/playlistModel';
import { list_songType } from '@/model/songModel';
import { list_userType } from '@/model/userModel';
import React from 'react';

type Props = {
    listPlaylist: list_playlistType
    listSong: list_songType
    listAlbum: list_playlistType
    listArtist: list_userType
    is_loading: boolean
}

const SearchAll = ({ listPlaylist, listSong, listAlbum, listArtist, is_loading }: Props) => {
    return (
        <div>
            <div className="bodySearchPageAll">
                {is_loading && <div className='loading'>
                    <LoadingSVGWatting w={100} />
                </div>}

                {!is_loading && <>
                    {listSong.length == 0 && listPlaylist.length == 0 && listAlbum.length == 0 && listArtist.length == 0 && <div className='emtyData'><h1>Not found</h1></div>}
                    {listSong.length > 0 &&
                        <div className="headerBodySearch">
                            <div className="frameTopResult">
                                <h1>Top results</h1>
                                <ItemTopResult key={0} song={listSong[0]} index={0} list={listSong} info_Playlist={playlistModel.init} />
                            </div>

                            <div className="frameResultSongs">
                                <h1>Songs</h1>
                                <div className="listSongResult">
                                    {listSong.map((song, index) => {
                                        if (index != 0 && index < 5) {
                                            return <ItemSong key={index} song={song} index={index} list={listSong} info_Playlist={playlistModel.init} />
                                        }
                                    })}
                                </div>
                            </div>
                        </div>}
                    {listPlaylist.length > 0 &&
                        <div className="framePlaylist">
                            <ListPlaylist arrayPlaylist={listPlaylist} />
                        </div>}
                    {listAlbum.length > 0 &&
                        <div className="framePlaylist">
                            <ListPlaylist arrayPlaylist={listPlaylist} />
                        </div>}
                    {listArtist.length > 0 &&
                        <div className="frameArtist">
                            <ListArtist arrayArtist={listArtist} />
                        </div>}</>}
            </div>
        </div>
    );
}

export default SearchAll;
