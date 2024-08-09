import ItemSong from '@/components/search/itemSong';
import { LoadingSVGWatting } from '@/Icons/Loading';
import { playlistModel } from '@/model/playlistModel';
import { list_songType } from '@/model/songModel';
import React from 'react';
type Props = {
    listSong: list_songType
    is_loading: boolean
}
const SearchSong = ({ listSong, is_loading }: Props) => {
    return (
        <div className="bodySearchPageAll">
            {is_loading && <div className='loading'>
                <LoadingSVGWatting w={100} />
            </div>}
            {!is_loading && <>
                {listSong.length == 0 && <div className='emtyData'><h1>Not found</h1></div>}
                {listSong.length != 0 && <div className='listSongSearch'>
                    {listSong.map((song, i) => {
                        return <ItemSong key={i} song={song} list={listSong} info_Playlist={playlistModel.init} index={i} />
                    })}
                </div>}
            </>}
        </div>
    );
}

export default SearchSong;
