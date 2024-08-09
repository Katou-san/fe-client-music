"use client";
import React, { useEffect, useState } from "react";
import "./_library.scss";
import { Playlist } from "@/apis/Playlist";
import { list_playlistType } from "@/model/playlistModel";
import ListPlaylistLib from "@/components/library/playlist/listPlaylistLib";
import ListAlbumLib from "@/components/library/album/listAlbumLib";
import ItemYourSong from "@/components/library/yourSong/itemYourSong";
import { Storages } from "@/apis/Storages";
import { storageModel, storageType } from "@/model/storageModel";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import ListSong from "@/components/home/Songs/ListSong";
import { Track } from "@/apis/Track";
import { list_songType } from "@/model/songModel";
import ListPlaylist from "@/components/home/Playlists/listPlaylist";
import { useReload } from "@/contexts/providerReload";
import { Like } from "@/apis/Like";
const Page = () => {
  const { re_playlist } = useReload()
  const userProvider = useSelector((state: RootState) => state.auth)
  const userInfo = useSelector((state: RootState) => state.info)
  const [listPlaylist, setListPlaylist] = useState<list_playlistType>([]);
  const [listAlbum, setAlbum] = useState<list_playlistType>([]);
  const [listLikePlaylist, setLikePlaylist] = useState<list_playlistType>([]);
  const [listLikeAlbum, setLikeAlbum] = useState<list_playlistType>([]);
  const [storage, set_Storage] = useState<storageType>(storageModel.init);
  const [is_Loading, set_Loading] = useState(false)
  const [listSong, set_ListSong] = useState<list_songType>([])

  useEffect(() => {
    if (userProvider.Access_Token != '' && userProvider.is_Login) {
      set_Loading(true)
      Promise.all([
        Storages.Get_User().then((res) => { set_Storage(res.data) }),
        Playlist.Get_User_Playlist().then((res) => { setListPlaylist(res.data) }),
        Playlist.Get_User_Album().then((res) => { setAlbum(res.data) }),
        // Like.Get_Playlist().then((res)=>{} )

      ]).then(() => set_Loading(false));
    }

  }, [userProvider, re_playlist]);

  useEffect(() => {
    if (userProvider.is_Login && userProvider.Access_Token != '') {
      if (userInfo?.Upload != "") {
        Track.Get_Track(userInfo.Upload)
          .then(res => {
            set_ListSong(res.data)
            set_Loading(false)
          })
      }
    }
  }, [userProvider, userInfo])

  return (
    <div className="frameLibrary">
      <div className="designframe">
        {userProvider.Access_Token != '' && userProvider.is_Login && <>
          <div className="lineLibrary yourSongLibrary">
            {is_Loading && <div className="frameLoading">
              <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <ItemYourSong storage={storage} />}

          </div>
          <div className="lineLibrary ">
            {is_Loading && <div className="frameLoading">
              <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <ListSong arraySong={listSong} />}

          </div>
          <div className="lineLibrary yourPlaylistLibrary">
            {is_Loading && <div className="frameLoading">
              <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <ListPlaylist arrayPlaylist={listPlaylist} showInfo={true} />}

          </div>
          <div className="lineLibrary yourAlbumLibrary">
            {is_Loading && <div className="frameLoading">
              <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <ListPlaylist arrayPlaylist={listAlbum} showInfo={true} />}

          </div>

          <div className="lineLibrary likeAlbum"></div></>}
        {userProvider.Access_Token == '' && !userProvider.is_Login && <>
          <div className="frameContentError">
            <h1>You need login</h1>
          </div>
        </>}
      </div>
    </div>
  );
};

export default Page;
