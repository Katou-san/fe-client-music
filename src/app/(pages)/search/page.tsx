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
import SearchAll from '@/components/search/all/searchAll';
import SearchSong from '@/components/search/song/searchSong';
import SearchPlaylist from '@/components/search/playlist/searchPlaylist';
import SearchArtist from '@/components/search/artist/searchArtist';
const Page = () => {

    const searchProvider = useSelector((state: RootState) => state.search)
    const [is_loading, setLoading] = useState(false)
    const [stateIndex, set_StateIndex] = useState(0)
    const [listSong, set_ListSong] = useState<list_songType>([])
    const [listPlaylist, set_ListPlaylist] = useState<list_playlistType>([]);
    const [listAlbum, set_ListAlbum] = useState<list_playlistType>([]);
    const [listArtist, set_ListArtist] = useState<list_userType>([])


    useEffect(() => {
        if (searchProvider.trim() != '') {
            setLoading(true)
            switch (stateIndex) {
                case 0: Search.Get_All(searchProvider)
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
                    break;
                case 1:
                    Search.Get_Type(listOption[stateIndex].value, searchProvider)
                        .then((res) => {
                            if (res.status == 200) {
                                set_ListSong(res.data?.result)
                                setLoading(false)
                            } else {
                                setLoading(false)
                            }
                        })
                    break;
                case 2:
                    Search.Get_Type(listOption[stateIndex].value, searchProvider)
                        .then((res) => {
                            if (res.status == 200) {
                                set_ListPlaylist(res.data?.result)
                                setLoading(false)
                            } else {
                                setLoading(false)
                            }
                        })
                    break;
                case 3:
                    Search.Get_Type(listOption[stateIndex].value, searchProvider)
                        .then((res) => {
                            if (res.status == 200) {
                                set_ListAlbum(res.data?.result)
                                setLoading(false)
                            } else {
                                setLoading(false)
                            }
                        })
                    break;
                case 4:
                    Search.Get_Type(listOption[stateIndex].value, searchProvider)
                        .then((res) => {
                            if (res.status == 200) {
                                set_ListArtist(res.data?.result)
                                setLoading(false)
                            } else {
                                setLoading(false)
                            }
                        })
                    break;
            }
        }
    }, [searchProvider, stateIndex])



    return (
        <div className='frameSearchPage'>
            <div className="headerSearchPage">
                <div className="listOption">
                    {listOption.map((option, index) => {
                        return <div key={index} className={`itemOptionHeader ${index == stateIndex && 'activeItemOptionHeader'}`} onClick={() => set_StateIndex(index)}>
                            <h1>{option.title}</h1>
                        </div>
                    })}
                </div>
            </div>
            {
                {
                    0: <SearchAll listAlbum={listAlbum} listArtist={listArtist} listPlaylist={listPlaylist} listSong={listSong} is_loading={is_loading} />,
                    1: <SearchSong listSong={listSong} is_loading={is_loading} />,
                    2: <SearchPlaylist listPlaylist={listPlaylist} is_loading={is_loading} />,
                    3: <SearchPlaylist listPlaylist={listAlbum} is_loading={is_loading} />,
                    4: <SearchArtist listArist={listArtist} is_loading={is_loading} />

                }[stateIndex]


            }

        </div>
    );
}

export default Page;
