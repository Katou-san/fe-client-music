'use client'
import React, { useEffect, useState } from "react";
import './_profile.scss'
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { userModel, userType } from "@/model/userModel";
import Image from "next/image";
import { User } from "@/apis/User";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
import imgTemp from '../../../../public/temp.jpg'
import { Follow_Icon, Repost_Icon } from "@/Icons/icon_Figma";
import ItemPost from "@/components/profile/itemPost";
import { useSearchParams } from "next/navigation";
import { Repost } from "@/apis/Repost";
import { list_repostType } from "@/model/repostModel";
import { followModel } from "@/model/followModel";
import { Follow } from "@/apis/Follow";
import EditForm from "@/components/profile/editForm";
const Page = () => {
  const [showEdit, set_ShowEdit] = useState(false)
  const [Reload, set_Reload] = useState(false)
  const [ReloadPost, set_ReloadPost] = useState(false)
  const userProvider = useSelector((state: RootState) => state.auth)
  const [listRepost, set_ListRepost] = useState<list_repostType>([])
  const [infoUser, set_Info] = useState<userType>(userModel.init)
  const [follow, set_follow] = useState(followModel.init_res)
  const [url, set_url] = useState('')
  const seachParam = useSearchParams();
  const UserId = seachParam.get("id");

  useEffect(() => {
    if (UserId != undefined && UserId != null && UserId != '') {
      Promise.all([
        User.Get_Id(UserId)
          .then((res) => set_Info(res.data)),
        Follow.Get_Follow(UserId)
          .then((res) => {
            if (res.status == 200) {
              set_follow(res.data)
            }
          })
      ])

    }
  }, [UserId, Reload])



  useEffect(() => {
    if (infoUser?.Avatar != '' && infoUser?.Avatar != undefined) {
      if (URLValidate.isUrl(infoUser.Avatar)) {
        Send.Avatar(infoUser.Avatar)
          .then((res) => set_url(URL.createObjectURL(res)))
      } else {
        set_url(infoUser.Avatar)
      }

    }
  }, [infoUser])


  useEffect(() => {
    if (UserId != undefined && UserId != null && UserId != '') {
      Repost.Get_Id(UserId)
        .then((res) => {
          if (res.status == 200) {
            set_ListRepost(res.data)
          }
        })
    }
  }, [ReloadPost, infoUser])


  return <div className="frameProfile">
    <div className="headerProfile">
      <div className="background">
        <div className="frameImg">
          <Image alt="" src={url || imgTemp} width={150} height={150} />
        </div>
      </div>
      <div className="infoUser">
        {userProvider.User_Id != UserId &&
          <div className="frameOption">
            <div className="frameFollow">
              <Follow_Icon />
              <h1>Follow</h1>
            </div>
          </div>}
        {userProvider.User_Id == UserId && <div className="frameOption" >
          <div className="editProfile" onClick={() => set_ShowEdit(true)}>Edit profile</div>
        </div>}

        <div className="frameName">
          <h1>{infoUser.User_Name}</h1>
        </div>
        <div className="frameId">
          <h1>{infoUser.User_Email}</h1>
        </div>
        <div className="frameCreate">
          <h1>create date: {new Date(infoUser.Create_date).toLocaleDateString()}</h1>
        </div>
        <div className="frameFollow">
          <div className="following">
            <span>{follow?.Following.length}</span> follwing
          </div>
          <div className="follower">
            <span>{follow?.Follower.length}</span> follwer
          </div>
        </div>
      </div>


    </div>
    <div className="bodyProfile">
      <div className="titleBody">
        <h1>Posts</h1>
      </div>
      <div className="listPost">
        {listRepost.length == 0 && <div className="loading">No repost</div>}
        {listRepost.length > 0 && listRepost.map((post, index) => <ItemPost key={index} post={post} onReload={() => set_ReloadPost(prev => !prev)} />)}
      </div>
    </div>
    <EditForm infoUser={infoUser} is_Show={showEdit} set_Show={() => set_ShowEdit(false)} set_Reload={() => set_Reload(prev => !prev)} />
  </div>
};

export default Page;
