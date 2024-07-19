'use client'
import React, { useEffect, useState } from 'react';
import './_searchPage.scss'
import { listOption } from '@/configs/searchConfig';
import { list_songType } from '@/model/songModel';
import ItemTopResult from '@/components/search/itemTopResult';
import { list_playlistType, playlistModel } from '@/model/playlistModel';
import ItemSong from '@/components/search/itemSong';
import ListPlaylist from '@/components/home/Playlists/listPlaylist';
import ListArtist from '@/components/home/Artists/listArtist';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { Search } from '@/apis/Search';
import { list_userType } from '@/model/userModel';
import { LoadingSVGWatting } from '@/Icons/Loading';
const Page = () => {

    const searchProvider = useSelector((state: RootState) => state.search)
    const [is_loading, setLoading] = useState(false)
    const [listSong, set_ListSong] = useState<list_songType>([])
    const [listPlaylist, set_ListPlaylist] = useState<list_playlistType>([]);
    const [listAlbum, set_ListAlbum] = useState<list_playlistType>([]);
    const [listArtist, set_ListArtist] = useState<list_userType>([])
    useEffect(() => {
        if (searchProvider.trim() != '') {
            setLoading(true)
            Search.Get_All(searchProvider)
                .then((res) => {
                    if (res.status == 200) {
                        set_ListSong(res.data?.Song)
                        set_ListPlaylist(res.data?.Playlist)
                        set_ListAlbum(res.data?.Album)
                        set_ListArtist(res.data?.Artist)
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                })
        }
    }, [searchProvider])

    return (
        <div className='frameSearchPage'>
            <div className="headerSearchPage">
                <div className="listOption">
                    {listOption.map((option, index) => {
                        return <div key={index} className="itemOptionHeader">
                            <h1>{option.title}</h1>
                        </div>
                    })}
                </div>
            </div>
            <div className="bodySearchPage">
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
                            <ListArtist />
                        </div>}</>}
            </div>
        </div>
    );
}

export default Page;
