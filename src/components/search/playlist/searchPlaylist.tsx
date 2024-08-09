import ItemListPlayList from '@/components/home/Playlists/itemListPlayList';
import './_searchPlaylist.scss'
import { LoadingSVGWatting } from '@/Icons/Loading';
import { list_playlistType, playlistModel } from '@/model/playlistModel';
import React from 'react';
type Props = {
    listPlaylist: list_playlistType
    is_loading: boolean
}
const SearchPlaylist = ({ listPlaylist, is_loading }: Props) => {
    return (
        <div className="bodySearchPageAll">
            {is_loading && <div className='loading'>
                <LoadingSVGWatting w={100} />
            </div>}
            {!is_loading && <>
                {listPlaylist.length == 0 && <div className='emtyData'><h1>Not found</h1></div>}
                {listPlaylist.length != 0 && <div className='listPlaylistSearch'>
                    {listPlaylist.map((playlist, i) => {
                        return <ItemListPlayList key={i} item={playlist} index={i} active={false} />
                    })}
                </div>}
            </>}
        </div>
    );
}

export default SearchPlaylist;
