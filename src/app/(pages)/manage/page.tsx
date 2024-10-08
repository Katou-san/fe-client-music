'use client'
import React, { useEffect, useState } from "react";
import "./_manage.scss"
import { Playlist } from "@/apis/Playlist";
import { list_playlistType, playlistModel, playlistType } from "@/model/playlistModel";
import { list_songType } from "@/model/songModel";
import { Track } from "@/apis/Track";
import AddSong from "@/components/manage/AddSong/AddSong";
import ItemSongManage from "@/components/manage/ItemSong/itemSongManage";
import DetailSong from "@/components/manage/detailSong/detailSong";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import DeleteSong from "@/components/manage/deleteSong/deleteSong";
import EditSong from "@/components/manage/editSong/editSong";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { Circle_Icon } from "@/Icons/icon_Figma";
import { storageModel, storageType } from "@/model/storageModel";
import { Storages } from "@/apis/Storages";
import { useRouter } from "next/navigation";
import { useLayout } from "@/contexts/providerLayout";
import { Role } from "@/apis/Role";
import { roleModel, roleType } from "@/model/roleModel";
import { RoleConfigCreator } from "@/configs/rolesConfig";
const Page = () => {
  const routes = useRouter()
  const { setAlbumForm } = useLayout()
  const userProvider = useSelector((state: RootState) => state.auth)
  const [showAdd, set_ShowAdd] = useState(false)
  const [infoPlaylist, set_info] = useState<playlistType>(playlistModel.init)
  const [infoRole, set_infoRole] = useState<roleType>(roleModel.init)
  const [list, set_List] = useState<list_songType>([])
  const [detail, setDetail] = useState({ index: 0, show: false, getStar: 0, cate: "" })
  const [deleteSong, set_DeleteSong] = useState({ index: 0, show: false })
  const [editSong, set_EditSong] = useState({ index: 0, show: false, cate: "" })
  const [reload, set_Reload] = useState(false)
  const [is_Loading, set_Loading] = useState(false)
  const [Storage, set_Storage] = useState<storageType>(storageModel.init)
  const [searchValue, set_SearchValue] = useState('')
  const [currentListSong, set_CurrentListSong] = useState<list_songType>([])


  useEffect(() => {
    if (userProvider.is_Login && userProvider.Access_Token != '') {
      set_Loading(true)
      Promise.all([
        Playlist.Get_Default().then(res => {
          const listPlaylist = res.data as list_playlistType;
          listPlaylist.map((playlist) => {
            if (playlist.Playlist_Name.toLowerCase() == "upload") {
              set_info(playlist);

            }
          })
        }),
        Storages.Get_User().then((res) => {
          if (res.status == 200) {
            set_Storage(res.data)
          }
        }),
        Role.Get_Current()
          .then((res) => {
            if (res.status == 200) {
              set_infoRole(res.data)
            }
          })

      ])

    }

  }, [userProvider, reload])

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      set_CurrentListSong(currentListSong.filter((song, i) =>
        song.Song_Name.includes(searchValue.trim()))
      );
    } else {
      set_CurrentListSong(list)
    }

  }, [searchValue])

  useEffect(() => {
    if (userProvider.is_Login && userProvider.Access_Token != '') {
      if (infoPlaylist.Playlist_Id != "") {
        Track.Get_Track(infoPlaylist.Playlist_Id)
          .then(res => {
            if (res.status == 200) {
              set_List(res.data)
              set_CurrentListSong(res.data)
            }
            set_Loading(false)
          })
      }
    }
  }, [infoPlaylist, userProvider])

  const handleShowAdd = () => {
    set_ShowAdd(pre => !pre)
  }

  const handleDetail = (value: Object) => {
    setDetail({ ...detail, ...value })
  }

  const handle_Delete = (value: Object) => {
    set_DeleteSong({ ...deleteSong, ...value })
  }

  const handleUpdate = (value: Object) => {
    set_EditSong({ ...editSong, ...value })
  }

  return <div className="frameManage">
    {userProvider.Access_Token != '' &&
      <div className={`backrgroundManage ${showAdd || detail.show || deleteSong.show || editSong.show ? '' : ""}`}>
        <div className="headerManage">
          <div className="frameInput">
            <input type="text" placeholder="Search" value={searchValue} onChange={(e) => set_SearchValue(e.target.value)} />
          </div>
          <div className="frameStorage">
            <div className="frameIcon">
              <Circle_Icon style={{ strokeDasharray: 160, strokeDashoffset: -(Storage.Used / Storage.Limit) * 160 }} />
            </div>
            <div className="contentStorage">
              <div className="contentDetail">
                <div className="title">
                  <h1>used:</h1>
                  <h3>{Math.round(Storage.Used)} mb</h3>
                </div>
                <div className="title">
                  <h1>limit:</h1>
                  <h3>{Storage.Limit} mb</h3>
                </div>

              </div>

            </div>
          </div>
          <div className="frameUpgradeSub" >
            <div className="UpgradeSub cursor_pointer overflow__Text" onClick={() => {
              routes.push('/subscription')
            }}>
              <h1 className="overflow__Text">Upgrade plan</h1>
            </div>

          </div>
          {RoleConfigCreator.includes(infoRole.Role_Name) && <div className="btnCreate " onClick={() => setAlbumForm(true)}> <h1 className="overflow__Text">Create Album</h1> </div>}
          <div className="btnCreate" onClick={handleShowAdd}> <h1 className="overflow__Text"> Create Song</h1></div>
        </div>
        <div className="bodyManage">
          <div className="headerTable">
            <h1>#</h1>
            <h1>info</h1>
            <h1>cate</h1>
            <h1>public</h1>
            <h1>star</h1>
            <h1>date</h1>
            <span></span>

          </div>
          <div className="bodyTable">
            {is_Loading && <div className="frameLoading">
              <LoadingSVGWatting w={70} color="#000" />
            </div>}

            {!is_Loading && <div className="listItem">
              {currentListSong.map((song, index) =>
                <ItemSongManage
                  listSong={currentListSong}
                  song={song}
                  key={index}
                  index={index}
                  handle_Delete={handle_Delete}
                  handle_Detail={handleDetail}
                  handle_Update={handleUpdate}
                />)}
            </div>}
          </div>
        </div>
        <AddSong handleShow={handleShowAdd} isShow={showAdd} onClose={() => set_ShowAdd(false)} onReload={() => set_Reload(pre => !pre)} />
        {currentListSong.length > 0 && <EditSong song={currentListSong[editSong.index]} editSong={editSong} handle_Edit={handleUpdate} onReload={() => set_Reload(pre => !pre)} />}
        {currentListSong.length > 0 && <DetailSong song={currentListSong[detail.index]} detail={detail} handle_Detail={handleDetail} />}
        {currentListSong.length > 0 && <DeleteSong song={currentListSong[deleteSong.index]} deleteSong={deleteSong} handle_Delete={handle_Delete} onReload={() => set_Reload(pre => !pre)} />}
      </div>}
    {userProvider.Access_Token == '' && <div> You need login</div>}
  </div>
};

export default Page;
